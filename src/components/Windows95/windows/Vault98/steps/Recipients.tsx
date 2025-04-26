import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; // shadcn input

interface TokenDetailsProps {
  icon: string;
  symbol: string;
  balance: string;
}

const TokenInfo = ({ icon, symbol, balance }: TokenDetailsProps) => {
  return (
    <div className="flex items-center justify-between border border-black bg-[#e0e0e0] px-3 py-2  text-sm">
      <div className="flex items-center gap-2">
        <img src={icon} alt={symbol} width={20} height={20} />
        <span>{symbol}</span>
      </div>
      <span className="text-xs text-right text-gray-700 font-mono">
        Available: {balance}
      </span>
    </div>
  );
};

export const Recipients = () => {
  const { register } = useFormContext();

  // 🧪 Mocked token data — replace with real values
  const selectedToken = {
    icon: "/tokens/usdc.png",
    symbol: "USDC",
    balance: "420.69",
  };

  return (
    <div className="space-y-3">
      <TokenInfo {...selectedToken} />

      <div className="space-y-1">
        <label className="font-semibold text-sm">Amount:</label>
        <Input
          {...register("amount")}
          placeholder="e.g. 100"
          className="bg-white border border-black font-mono text-sm rounded-none"
        />
      </div>

      <div className="space-y-1">
        <label className=" text-sm font-semibold">Recipient Address:</label>
        <Input
          {...register("recipient")}
          placeholder="e.g. alice.sol"
          className="bg-white border border-black font-mono text-sm rounded-none"
        />
      </div>
    </div>
  );
};
