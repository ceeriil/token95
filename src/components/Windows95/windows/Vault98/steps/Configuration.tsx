import { useState, useMemo } from "react";
import { format, isBefore, setHours, setMinutes, startOfDay } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../../ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../ui/select";
import { Calendar } from "../../../../ui/calendar";
import { Input } from "../../../../ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useGetTokenAccounts } from "@/lib/account";
import { useJupiterTokenList } from "@/lib/token-list";
import { Controller, useFormContext } from "react-hook-form";

export const Configuration = () => {
  const { publicKey } = useWallet();
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const { data: tokenAccounts, isLoading } = useGetTokenAccounts({
    address: publicKey as PublicKey,
  });

  const { data: jupiterTokenList } = useJupiterTokenList();

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    updateUnlockDate(date, selectedTime);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    updateUnlockDate(selectedDate, time);
  };

  const updateUnlockDate = (
    date?: Date,
    timeStr?: string,
    onChange?: (value: string) => void
  ) => {
    if (!date || !timeStr) return;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const unlockDate = setMinutes(setHours(date, hours), minutes);
    if (onChange) {
      onChange(unlockDate.toISOString());
    } else {
      setValue("unlockDateTime", unlockDate.toISOString());
      console.log(unlockDate.toISOString(), unlockDate, "dd");
    }
  };

  const tokenOptions = useMemo(() => {
    if (!tokenAccounts) return [];

    return [
      { mint: "SOL", symbol: "SOL" },
      ...tokenAccounts.map((account) => {
        const parsed = account.account.data.parsed.info;
        const mintAddress = parsed.mint;

        const tokenInfo = jupiterTokenList?.find(
          (token) => token.address === mintAddress
        );

        return {
          mint: mintAddress,
          symbol: tokenInfo?.symbol || mintAddress,
        };
      }),
    ];
  }, [tokenAccounts, jupiterTokenList]);

  return (
    <div className="space-y-4 text-sm text-black relative">
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Token</label>
        <Controller
          name="mint"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border border-black bg-[#c3c7cb] text-black text-sm shadow-inner no-outline rounded-none hover:bg-[#d5d8dc]">
                <SelectValue
                  placeholder={isLoading ? "Loading tokens..." : "Select token"}
                />
              </SelectTrigger>
              <SelectContent className="bg-white border border-black rounded-none shadow-lg text-sm z-[120]">
                {tokenOptions.map((token) => (
                  <SelectItem
                    key={token.mint}
                    value={token.mint}
                    className="cursor-default px-2 py-1 hover:bg-[#c3c7cb] hover:text-black focus:bg-[#c3c7cb] focus:text-black"
                  >
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.mint && (
          <p className="text-red-500 text-xs mt-1">{errors.root?.message}</p>
        )}
      </div>

      <div className="grid grid-cols-[70%,30%] space-x-4">
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Unlock Date:</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full px-2 py-[7px] border border-black bg-[#c3c7cb] shadow-inner rounded-none hover:bg-[#d5d8dc] text-left"
              >
                {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border border-black shadow-xl z-[120]">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => isBefore(date, startOfDay(new Date()))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold">Unlock Time:</label>
          <Input
            type="time"
            step={60}
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full px-2 py-[6px] border border-black bg-[#c3c7cb] text-black shadow-inner rounded-none hover:bg-[#d5d8dc] font-mono"
          />
        </div>
      </div>
    </div>
  );
};
