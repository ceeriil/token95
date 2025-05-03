import type { IThreatReport } from "@/types/report";

const WEBACY_API_KEY = import.meta.env.VITE_WEBACY_API_KEY;

const commonHeaders = {
  Accept: "application/json",
  "x-api-key": WEBACY_API_KEY,
};

export const fetchAddressThreatReport = async (
  address: string
): Promise<IThreatReport | null> => {
  if (!address) return null;

  try {
    const response = await fetch(
      `https://api.webacy.com/addresses/${address}?chain=sol`,
      {
        method: "GET",
        headers: commonHeaders,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch address threat data.");
    }

    return (await response.json()) as IThreatReport;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchTransactionThreatReport = async (
  txHash: string
): Promise<IThreatReport | null> => {
  if (!txHash) return null;

  try {
    const response = await fetch(
      `https://api.webacy.com/transactions/${txHash}`,
      {
        method: "GET",
        headers: commonHeaders,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transaction threat data.");
    }

    return (await response.json()) as IThreatReport;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchRiskProfile = async (
  walletAddress: string
): Promise<IThreatReport | null> => {
  if (!walletAddress) return null;

  try {
    const response = await fetch(
      `https://api.webacy.com/quick-profile/${walletAddress}`,
      {
        method: "GET",
        headers: commonHeaders,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quick risk profile.");
    }

    return (await response.json()) as IThreatReport;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchContractRiskReport = async (
  contractAddress: string
): Promise<IThreatReport | null> => {
  if (!contractAddress) return null;

  try {
    const response = await fetch(
      `https://api.webacy.com/contracts/${contractAddress}`,
      {
        method: "GET",
        headers: commonHeaders,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contract risk data.");
    }

    return (await response.json()) as IThreatReport;
  } catch (err) {
    console.error(err);
    return null;
  }
};
