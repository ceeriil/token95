import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clipboard, Printer, Share2 } from "lucide-react";
import { useTokenReport } from "@/hooks/useTokenReport";

export default function RiskScannerMainWindow() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("token");
  const { data, loading, error } = useTokenReport(
    "45EgCwcPXYagBC7KqBin4nCFgEZWN7f3Y6nACwxqMCWX"
  );

  console.log("data ffff", data);

  const handleScan = () => {
    setResult({
      riskScore: "84%",
      summary:
        "Token flagged for reentrancy vulnerability and unverified contract.",
      connections: "Connected to known scams",
      liquidity: "Not locked",
      anonTeam: "Yes",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#c3c3c3] text-black border border-black rounded-none shadow-[4px_4px_0_#000]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="bg-[#f0f0f0] flex">
          <TabsTrigger value="token">🧬 Token Risk</TabsTrigger>
          <TabsTrigger value="wallet">👛 Wallet Risk</TabsTrigger>
          <TabsTrigger value="contract">🪪 Contract Risk</TabsTrigger>
          <TabsTrigger value="url">🌍 URL Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="token">
          <div className="space-y-2 mt-4">
            <Input
              placeholder="Paste a token address"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button className="bg-[#000080] text-white" onClick={handleScan}>
              Check Risk
            </Button>

            {result && (
              <div className="bg-white p-4 border border-black shadow-inner mt-4">
                <p>
                  <strong>🔴 Threat Score:</strong> {result.riskScore} Risky 🔥
                </p>
                <p>
                  <strong>🧠 Smart contract flags:</strong> {result.summary}
                </p>
                <p>
                  <strong>🕸️ Scam Links:</strong> {result.connections}
                </p>
                <p>
                  <strong>📦 Liquidity Locked:</strong> {result.liquidity}
                </p>
                <p>
                  <strong>👻 Anon Team:</strong> {result.anonTeam}
                </p>

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
        </TabsContent>
      </Tabs>
    </div>
  );
}
