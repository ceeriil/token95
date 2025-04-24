import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

interface NetworkIndicatorProps {
  network: "mainnet" | "testnet" | "disconnected";
}

const getStatusColor = (network: string) => {
  switch (network) {
    case "mainnet":
      return "bg-green-600";
    case "testnet":
      return "bg-yellow-400";
    case "disconnected":
      return "bg-red-500 animate-blink";
    default:
      return "bg-gray-400";
  }
};

const getStatusLabel = (network: string) => {
  switch (network) {
    case "mainnet":
      return "Mainnet";
    case "testnet":
      return "Testnet";
    case "disconnected":
      return "disconnected";
    default:
      return "Unknown";
  }
};

export const NetworkIndicator = ({ network }: NetworkIndicatorProps) => {
  const colorClass = getStatusColor(network);
  const label = getStatusLabel(network);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 px-2 py-1 text-sm cursor-default font-medium">
            <div className={clsx("w-2 h-2 rounded-full", colorClass)} />
            <span>{label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#fefefe] border border-black text-xs shadow-md rounded-none text-black">
          {network === "disconnected"
            ? "Wallet not connected"
            : `You’re on ${label}`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
