import { useFormContext } from "react-hook-form";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../../ui/popover";
import { Calendar } from "../../../../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../../../../ui/radio-group";
import { format } from "date-fns";

export const Configuration = () => {
  const { register, setValue, watch } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startOption, setStartOption] = useState("delayed");

  // Watch for form value if needed
  const unlockDate = watch("unlockDate");

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue("unlockDate", date.toISOString());
    }
  };

  return (
    <div className="relative space-y-4">
      {/* Token Select */}
      <Select>
        <SelectTrigger className="w-full border border-black bg-[#c3c7cb] text-black font-mono text-sm shadow-inner no-outline rounded-none hover:bg-[#d5d8dc]">
          <SelectValue placeholder="Select token" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-black rounded-none shadow-lg font-mono text-sm">
          <SelectItem
            value="SOL"
            className="cursor-default px-2 py-1 hover:bg-[#c3c7cb] hover:text-black focus:bg-[#c3c7cb] focus:text-black"
          >
            SOL
          </SelectItem>
          <SelectItem
            value="USDC"
            className="cursor-default px-2 py-1 hover:bg-[#c3c7cb] hover:text-black focus:bg-[#c3c7cb] focus:text-black"
          >
            USDC
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Start Option */}
      <div className="space-y-2 font-mono text-sm text-black">
        <label className="block">Start Time</label>
        <RadioGroup
          value={startOption}
          onValueChange={(val) => {
            setStartOption(val);
            if (val === "now") {
              setSelectedDate(undefined);
              setValue("unlockDate", null);
            }
          }}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="now" id="start-now" />
            <label htmlFor="start-now">Immediately</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="delayed" id="start-delayed" />
            <label htmlFor="start-delayed">Pick date</label>
          </div>
        </RadioGroup>
      </div>

      {startOption === "delayed" && (
        <div className="flex flex-col gap-1 font-mono text-sm text-black">
          <label htmlFor="unlockDate" className="pl-[2px]">
            Unlock Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full text-left px-2 py-[4px] border border-black bg-[#c3c7cb] text-black shadow-inner rounded-none hover:bg-[#d5d8dc]"
              >
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border border-black shadow-xl z-[999]">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
