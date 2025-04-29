import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clipboard, Printer, Share2 } from "lucide-react";
import type { IThreatReportResult, IThreatReportIssue } from "@/types/report";
import { fetchAddressThreatReport } from "@/services/webacy";

export const AddressRiskTab = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<IThreatReportResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!inputValue) return;

    setLoading(true);
    setError(null);

    const data = await fetchAddressThreatReport(inputValue);
    console.log("bb", data);

    if (data) {
      // We are grouping all the address field. this would be used
      // to decide the kind of address user search for 🔍
      const addressInfo = data.details?.address_info;

      setResult({
        riskScore: `${Math.round(data.overallRisk || 0)}%`,
        isContract: data?.isContract
          ? "Yes (Contract)"
          : "No (Personal Wallet)",
        washTradingScore: addressInfo?.wash_trading ?? "Unknown",
        transactionCount: addressInfo?.transaction_count ?? "Unknown",
        balance: addressInfo?.balance ?? "Unknown",
        hasNoBalance: addressInfo?.has_no_balance ? "Yes" : "No",
        spamSNS: addressInfo?.is_spam_sns ? "Yes" : "No",
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

  return (
    <div className="space-y-2 mt-4">
      <Input
        placeholder="Paste a token address"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button className="bg-[#000080] text-white" onClick={handleScan}>
        {loading ? "Loading..." : "Check Risk"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="bg-white p-4 border border-black shadow-inner mt-4">
          <p>
            <strong>🔴 Threat Score:</strong> {result.riskScore}
          </p>
          <p>
            <strong>👛 Wallet Type:</strong> {result.isContract}
          </p>
          <p>
            <strong>🧹 Wash Trading:</strong> {result.washTradingScore}
          </p>
          <p>
            <strong>🔄 Total Transactions:</strong> {result.transactionCount}
          </p>

          <p>
            <strong>💰 Balance:</strong> {result.balance} SOL
          </p>
          <p>
            <strong>🫠 Has No Balance:</strong> {result.hasNoBalance}
          </p>
          <p>
            <strong>🚩 Spam SNS:</strong> {result.spamSNS}
          </p>

          {result.issues.length > 0 && (
            <div>
              <p>
                <strong>⚡ Issues Detected:</strong>
              </p>
              <ul className="list-disc ml-6">
                {result.issues.map((issue: string, index: number) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-2 mt-4">
            <Button variant="outline">
              <Clipboard className="w-4 h-4 mr-1" /> Copy
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-1" /> Share
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
