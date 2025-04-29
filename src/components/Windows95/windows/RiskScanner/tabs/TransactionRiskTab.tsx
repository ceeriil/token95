"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchTransactionThreatReport } from "@/services/webacy";

export const TransactionRiskTab = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!inputValue) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchTransactionThreatReport(inputValue);
      console.log("🧾 Transaction Risk Report:", data);
    } catch (err) {
      console.error("Error fetching transaction report:", err);
      setError("Failed to fetch transaction risk");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-2 mt-4">
      <Input
        placeholder="Paste a transaction signature"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleScan()}
      />
      <Button className="bg-[#000080] text-white" onClick={handleScan}>
        {loading ? "Loading..." : "Check Risk"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 border border-black shadow-inner mt-4">
        <p>Transaction risk analysis will appear here</p>
      </div>
    </div>
  );
};
