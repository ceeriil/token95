import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clipboard, Printer, Share2, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IThreatReportResult, IThreatReportIssue } from "@/types/report";
import { fetchAddressThreatReport } from "@/services/webacy";
import { AddressReportImage } from "../images/AddressReportImage";
import { toPng } from "html-to-image";

export const AddressRiskTab = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<IThreatReportResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);

  const handleScan = async () => {
    if (!inputValue) return;
    setLoading(true);
    setError(null);

    const data = await fetchAddressThreatReport(inputValue);

    if (data) {
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

  const handleCopy = async () => {
    if (!imageRef.current) return;
    const dataUrl = await toPng(imageRef.current);
    await navigator.clipboard.writeText(dataUrl);
  };

  const handleShare = () => {
    setShowModal(true);
  };

  const handleSaveImage = async () => {
    if (!modalImageRef.current) return;
    const dataUrl = await toPng(modalImageRef.current);
    const link = document.createElement("a");
    link.download = "wallet-risk-report.png";
    link.href = dataUrl;
    link.click();
  };

  const handleShareImage = async () => {
    if (!modalImageRef.current) return;
    const dataUrl = await toPng(modalImageRef.current);
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "wallet-risk-report.png", {
      type: "image/png",
    });

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check out this wallet risk score report 🧐👇"
    )}`;

    window.open(shareUrl, "_blank");
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
        <div
          className="bg-white p-4 border border-black shadow-inner mt-4"
          ref={imageRef}
        >
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
                {result.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-2 mt-4">
            <Button variant="outline" onClick={handleCopy}>
              <Clipboard className="w-4 h-4 mr-1" /> Copy
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1" /> Share
            </Button>
          </div>
        </div>
      )}

      {result && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="p-4 space-y-4 z-[999999]">
            <DialogHeader>
              <DialogTitle>Preview your Threat Report</DialogTitle>
              <DialogDescription>
                Save or share the image below.
              </DialogDescription>
            </DialogHeader>

            <div ref={modalImageRef}>
              <AddressReportImage result={result} />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleSaveImage}>
                <Download className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button variant="outline" onClick={handleShareImage}>
                <Share2 className="w-4 h-4 mr-1" /> Share to Twitter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
