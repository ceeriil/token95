import { useEffect, useState } from "react";
import type { ITokenReport } from "@/types";

interface UseTokenReportResult {
  data: ITokenReport | null;
  loading: boolean;
  error: string | null;
}

export function useTokenReport(
  tokenAddress: string | null
): UseTokenReportResult {
  const [data, setData] = useState<ITokenReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenAddress) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchTokenReport() {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(
          `https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`,
          { signal }
        );
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);

        console.log("hmm");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTokenReport();

    return () => {
      controller.abort();
    };
  }, [tokenAddress]);

  return { data, loading, error };
}
