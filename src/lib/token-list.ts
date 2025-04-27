import { useQuery } from "@tanstack/react-query";

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
}

export async function fetchJupiterTokenList(): Promise<TokenInfo[]> {
  const res = await fetch("https://token.jup.ag/all");
  if (!res.ok) throw new Error("Failed to fetch token list");
  return res.json();
}

export function useJupiterTokenList() {
  return useQuery({
    queryKey: ["jupiterTokenList"],
    queryFn: fetchJupiterTokenList,
    staleTime: 1000 * 60 * 30,
  });
}
