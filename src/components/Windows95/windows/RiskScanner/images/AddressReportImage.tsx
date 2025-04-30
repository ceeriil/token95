import React, { forwardRef } from "react";
import type { IThreatReportResult } from "@/types/report";

type RiskReportImageProps = {
  result: IThreatReportResult;
};

export const AddressReportImage = forwardRef<
  HTMLDivElement,
  RiskReportImageProps
>(({ result }, ref) => (
  <div
    ref={ref}
    className="w-[500px] p-6 bg-white border border-black rounded-md text-black font-mono"
  >
    <h2 className="text-xl font-bold mb-4">📊 Wallet Risk Report</h2>
    <p>🔴 Threat Score: {result.riskScore}</p>
    <p>👛 Wallet Type: {result.isContract}</p>
    <p>🧹 Wash Trading: {result.washTradingScore}</p>
    <p>🔄 Total Transactions: {result.transactionCount}</p>
    <p>💰 Balance: {result.balance} SOL</p>
    <p>🫠 Has No Balance: {result.hasNoBalance}</p>
    <p>🚩 Spam SNS: {result.spamSNS}</p>
    {result.issues.length > 0 && (
      <>
        <p className="mt-2 font-bold">⚡ Issues:</p>
        <ul className="list-disc ml-6">
          {result.issues.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </>
    )}
    <p className="mt-6 text-xs text-gray-500">Generated via Sandworm 🪱</p>
  </div>
));
