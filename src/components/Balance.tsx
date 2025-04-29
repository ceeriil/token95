import { useGetBalance } from "@/lib/account";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { PublicKey } from "@solana/web3.js";
import clsx from "clsx";

interface BalanceProps {
  address: PublicKey;
  className?: string;
}

export const Balance = ({ address, className }: BalanceProps) => {
  const { data: balance, isLoading, isError } = useGetBalance({ address });

  if (isLoading || isError || balance === undefined) return null;

  const sol = Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000;

  return (
    <div className={clsx("font-mono text-lg font-bold mr-3", className)}>
      {sol}
    </div>
  );
};
