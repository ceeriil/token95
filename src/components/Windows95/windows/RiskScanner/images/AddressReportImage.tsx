import React, { forwardRef } from "react";
import type { IThreatReportResult } from "@/types/report";
import { Minimize2, Minus, X } from "lucide-react";
import { DicebearAvatar } from "@/components/DicebearAvatar";

type RiskReportImageProps = {
  result: IThreatReportResult;
};

export const AddressReportImage = forwardRef<
  HTMLDivElement,
  RiskReportImageProps
>(({ result }, ref) => {
  const generatedAt = new Date().toLocaleString();

  return (
    <div
      ref={ref}
      className="min-w-[550px] border border-black rounded-md text-black  win-container bg-gray-300 relative"
    >
      <div
        className="bg-gray-300 text-black px-2 py-1 flex justify-between items-center cursor-move select-none "
        role="header"
      >
        <span className="font-medium">Wallet Risk Report</span>
        <div className="flex gap-1">
          <span
            aria-label="Minimize"
            className="bg-[#21C55D] text-black p-0.5 custom-border focus:outline-none"
          >
            <Minus className="h-3 w-3" />
          </span>

          <span className="bg-yellow-500 text-black p-0.5 custom-border focus:outline-none">
            <Minimize2 className="h-3 w-3" />
          </span>

          <span
            aria-label="Close"
            className="bg-red-500 text-black p-0.5 custom-border focus:outline-none"
          >
            <X className="h-3 w-3" />
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white win95-inset h-full border border-black py-2 px-4 pb-10 relative">
        <div className="flex justify-between">
          <div>
            {" "}
            <p>🔴 Threat Score: {result.riskScore}</p>
            <p>👛 Wallet Type: {result.isContract}</p>
            <p>🧹 Wash Trading: {result.washTradingScore}</p>
            <p>🔄 Total Transactions: {result.transactionCount}</p>
            <p>💰 Balance: {result.balance} SOL</p>
            <p>🫠 Has No Balance: {result.hasNoBalance}</p>
            <p>🚩 Spam SNS: {result.spamSNS}</p>
          </div>
          <div>
            <DicebearAvatar seed={result.address || ""} size={120} />
            <p className="text-center font-mono">
              {result.address?.slice(0, 6)}
              ...{result.address?.slice(-4)}
            </p>
          </div>
        </div>

        {result.issues.length > 0 && (
          <>
            <p className="mt-4 font-bold">⚡ Threat Report:</p>
            <ul className="list-disc ml-6">
              {result.issues.slice(0, 3).map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </>
        )}
        <p className="mt-6 text-xs text-gray-500">
          Generated via Token98 <br /> 📅 {generatedAt}
        </p>
        <img
          src="/img/dd.svg"
          width={100}
          className="absolute right-3 bottom-2"
        />
      </div>
    </div>
  );
});
