"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { useGetTokenAccounts } from "@/lib/account";

interface TokenDetailsProps {
  icon: string;
  symbol: string;
  balance: string;
}

const TokenInfo = ({ icon, symbol, balance }: TokenDetailsProps) => {
  return (
    <div className="flex items-center justify-between border border-black bg-[#e0e0e0] px-3 py-2 text-sm">
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
  const { register, watch } = useFormContext();
  const selectedTokenMint = watch("token");
  const { publicKey } = useWallet();
  const { data: tokenAccounts, isLoading } = useGetTokenAccounts({
    address: publicKey!,
  });

  const tokens = useMemo(() => {
    if (!tokenAccounts) return [];

    const parsedTokens = tokenAccounts.map((account) => {
      const parsed = account.account.data.parsed?.info;
      return {
        mint: parsed?.mint ?? "Unknown",
        symbol: parsed?.tokenAmount.decimals === 6 ? "USDC" : "Unknown",
        balance: parsed?.tokenAmount.uiAmountString ?? "0",
        icon: "/tokens/unknown.png",
      };
    });

    return [
      {
        mint: "SOL",
        symbol: "SOL",
        balance: "69.42",
        icon: "/tokens/sol.png",
      },
      ...parsedTokens,
    ];
  }, [tokenAccounts]);

  // find token that matches selectedTokenMint
  const selectedToken = useMemo(() => {
    if (!selectedTokenMint) return undefined;
    return tokens.find((token) => token.mint === selectedTokenMint);
  }, [selectedTokenMint, tokens]);

  return (
    <div className="space-y-3">
      {selectedToken ? (
        <TokenInfo {...selectedToken} />
      ) : (
        <div className="text-xs italic text-gray-500">Select a token first</div>
      )}

      <div className="space-y-1">
        <label className="font-semibold text-sm">Amount:</label>
        <Input
          {...register("amount")}
          placeholder="e.g. 100"
          className="bg-white border border-black font-mono text-sm rounded-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold">Recipient Address:</label>
        <Input
          {...register("recipient")}
          placeholder="e.g. alice.sol"
          className="bg-white border border-black font-mono text-sm rounded-none"
        />
      </div>
    </div>
  );
};
