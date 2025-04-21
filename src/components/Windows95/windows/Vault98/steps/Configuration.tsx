import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../ui/select";

export const Configuration = () => {
  const { register } = useFormContext();

  return (
    <div className="relative">
      <Select>
        <SelectTrigger className="w-full border border-black bg-[#c3c7cb] text-black font-mono text-sm shadow-inner no-outline rounded-none hover:bg-[#d5d8dc]">
          <SelectValue placeholder="Select token" />
        </SelectTrigger>
        <SelectContent className="bg-[#ffffff] border border-black rounded-none shadow-lg font-mono text-sm">
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
  );
};
