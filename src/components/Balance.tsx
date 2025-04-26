import { useGetBalance } from "@/lib/account";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { PublicKey } from "@solana/web3.js";

interface BalanceProps {
  address: PublicKey;
}

export const Balance = ({ address }: BalanceProps) => {
  const { data: balance, isLoading, isError } = useGetBalance({ address });

  console.log("balance", balance);

  if (isLoading || isError || balance === undefined) return null;

  const sol = Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000;

  return <div className="font-mono text-lg font-bold mr-3">{sol}</div>;
};
