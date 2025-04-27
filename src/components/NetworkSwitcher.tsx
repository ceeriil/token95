"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCluster } from "@/lib/cluster";
import { Globe2 } from "lucide-react";
import { NetworkIndicator } from "./Windows95/NetworkIndicator";
import { useWallet } from "@solana/wallet-adapter-react";

export function NetworkSwitcher() {
  const { clusters, setCluster, cluster } = useCluster();
  const { connected } = useWallet();

  const networkStatus = connected
    ? cluster.name === "mainnet"
      ? "mainnet"
      : "testnet"
    : "disconnected";

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="btn p-2">
            <Globe2 className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {clusters.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => setCluster(item)}
              className={item.active ? "font-bold text-primary" : ""}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <NetworkIndicator network={networkStatus} />
    </div>
  );
}
