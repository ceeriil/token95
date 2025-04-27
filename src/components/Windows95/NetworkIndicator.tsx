import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

interface NetworkIndicatorProps {
  network: "mainnet" | "testnet" | "devnet" | "disconnected";
}

const getStatusColor = (network: NetworkIndicatorProps["network"]) => {
  switch (network) {
    case "mainnet":
      return "bg-green-600";
    case "testnet":
      return "bg-yellow-400";
    case "devnet":
      return "bg-yellow-400";
    case "disconnected":
      return "bg-red-500 animate-blink";
    default:
      return "bg-gray-400";
  }
};

const getStatusLabel = (network: NetworkIndicatorProps["network"]) => {
  switch (network) {
    case "mainnet":
      return "Mainnet";
    case "testnet":
      return "Testnet";
    case "devnet":
      return "Devnet";
    case "disconnected":
      return "Disconnected";
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
          <div
            className={clsx(
              "flex items-center gap-1 p-1 cursor-default",
              network === "disconnected" && "opacity-70"
            )}
          >
            <div className={clsx("w-2.5 h-2.5 rounded-full", colorClass)} />
            <span className="text-xs font-bold">{label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#fefefe] border border-black text-xs shadow-md rounded-none text-black">
          {network === "disconnected"
            ? "Wallet not connected"
            : `You're on ${label}`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
