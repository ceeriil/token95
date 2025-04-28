import type { IThreatReport } from "@/types/report";

export const fetchAddressThreatReport = async (
  address: string
): Promise<IThreatReport | null> => {
  if (!address) return null;

  try {
    const response = await fetch(
      `https://api.webacy.com/addresses/${address}?chain=sol`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-key": import.meta.env.VITE_WEBACY_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch token data.");
    }

    const result: IThreatReport = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};
