"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchAddressThreatReport } from "@/services/webacy";
import type {
  IThreatReportIssue,
  ITokenReportResult,
  ITopHoldersReport,
} from "@/types/report";
import { Address } from "@/components/Address";
import { HoldersPieChart } from "../HoldersPieChart";

export const TokenRiskTab = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ITokenReportResult | null>(null);

  const handleScan = async () => {
    if (!inputValue) return;

    setLoading(true);
    setError(null);

    const data = await fetchAddressThreatReport(inputValue);

    console.log("hello", data);

    if (data) {
      setResult({
        riskScore: `${Math.round(data.overallRisk || 0)}%`,
        logoUrl: data.details.token_risk.token_logo,
        tokenName: data.details.token_risk.token_name,
        tokenSymbol: data.details.token_risk.token_symbol,
        contractAddress: data.details.token_info.links.contractAddress,
        isPumpFun: data.details.token_risk.is_pump_fun,
        currentPrice: data.details.marketData.current_price,
        ownershipDistribution: data.details.marketData.ownershipDistribution
          .topHolders as ITopHoldersReport[],
        devLaunchedToken24hr: data.details.dev_launched_tokens_in_24_hours,
        issues:
          data.issues?.map(
            (issue: IThreatReportIssue) => issue.tags[0].description
          ) ?? [],
      });
    } else {
      setError("Failed to fetch data");
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  const { logoUrl, tokenName, contractAddress, riskScore, issues } =
    result || {};

  return (
    <div className="space-y-4 mt-4 ">
      <div className="flex gap-4">
        <Input
          placeholder="Paste a token address"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full border border-black rounded-none"
        />
        <Button
          className="bg-blue-500 text-white border border-black shadow-[2px_2px_0_#000] hover:bg-blue-600 text-sm px-2 py-1.5"
          onClick={handleScan}
          disabled={loading}
        >
          {loading ? "Scanning..." : "Check Risk"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="bg-white border p-6 border-black space-y-6 custom-scroll h-60 overflow-y-scroll">
          <div className="flex items-center gap-4">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${tokenName} logo`}
                width={72}
                height={72}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800">{tokenName}</h2>
              <Address address={contractAddress || ""} type="account" />
            </div>
            <span
              className={`ml-auto border border-black p-1 ${
                riskScore === "Low Risk"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {riskScore}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-semibold">Current Price:</span>
            <span className="font-mono font-medium">
              ${result.currentPrice.toFixed(6)}
            </span>
            <span className="ml-auto text-gray-500">
              Dev Launched in Last 24hrs: {result.devLaunchedToken24hr}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              Report Summary
            </h3>
            {issues && issues.length === 0 ? (
              <p className="text-sm text-gray-500">No issues reported</p>
            ) : (
              <ul className="list-disc ml-5 text-sm space-y-1">
                {issues?.map((issue, i) => (
                  <li key={i} className="text-gray-700">
                    {issue || "Unnamed Issue"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {result.ownershipDistribution && (
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Top 10 Holders
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <HoldersPieChart holders={result.ownershipDistribution} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
