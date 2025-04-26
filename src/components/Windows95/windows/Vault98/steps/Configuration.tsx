"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
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

export const Configuration = () => {
  const { setValue } = useFormContext();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    updateUnlockDate(date, selectedTime);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    updateUnlockDate(selectedDate, time);
  };

  const updateUnlockDate = (date?: Date, timeStr?: string) => {
    if (!date || !timeStr) return;

    const [hours, minutes] = timeStr.split(":").map(Number);
    const unlockDate = setMinutes(setHours(date, hours), minutes);

    setValue("unlockDate", unlockDate.toISOString());
  };

  return (
    <div className="space-y-4  text-sm text-black relative">
      <div className="flex flex-col gap-1">
        <label className="font-semibold">Unlock Date:</label>
        <Select>
          <SelectTrigger className="w-full border border-black bg-[#c3c7cb] text-black  text-sm shadow-inner no-outline rounded-none hover:bg-[#d5d8dc]">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-black rounded-none shadow-lg text-sm z-[120]">
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
      </div>

      <div className="grid grid-cols-[70%,30%] space-x-4">
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Unlock Date:</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full px-2 py-[7px] border border-black bg-[#c3c7cb] shadow-inner rounded-none hover:bg-[#d5d8dc] text-left "
              >
                {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border border-black shadow-xl z-[120] ">
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
