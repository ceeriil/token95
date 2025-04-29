import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddressRiskTab, ContractRiskTab } from "./tabs";
import { TokenRiskTab } from "./tabs/TokenReportTab";

export default function RiskScannerMainWindow() {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-200 text-black border border-black rounded-none shadow-[4px_4px_0_#000]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="bg-[#f0f0f0] flex flex-wrap gap-2">
          <TabsTrigger value="wallet">👛 Address Risk</TabsTrigger>
          <TabsTrigger value="token">Token Risk</TabsTrigger>
          <TabsTrigger value="contract">🪪 Contract Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet">
          <AddressRiskTab />
        </TabsContent>

        <TabsContent value="contract">
          <ContractRiskTab />
        </TabsContent>

        <TabsContent value="token">
          <TokenRiskTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
