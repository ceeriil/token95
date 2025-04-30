import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddressRiskTab, ContractRiskTab } from "./tabs";
import { TokenRiskTab } from "./tabs/TokenReportTab";

export default function RiskScannerMainWindow() {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <div className="w-full h-full mx-auto bg-gray-100 text-black rounded-none">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className=" flex flex-wrap gap-2 rounded-none w-auto">
          <TabsTrigger
            value="wallet"
            className="rounded-none border border-black"
          >
            👛 Address Risk
          </TabsTrigger>
          <TabsTrigger
            value="token"
            className="rounded-none border border-black"
          >
            🪙 Token Risk
          </TabsTrigger>
          <TabsTrigger
            value="contract"
            className="rounded-none border border-black"
          >
            📜 Contract Risk
          </TabsTrigger>
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
