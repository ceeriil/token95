import { useWallet } from "@solana/wallet-adapter-react";
import { useCluster } from "@/lib/cluster";
import { useRequestAirdrop } from "@/lib/account";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe2 } from "lucide-react";
import { NetworkIndicator } from "./Windows95/NetworkIndicator";
import { PublicKey } from "@solana/web3.js";

const AirdropButton = ({ publicKey }: { publicKey: PublicKey }) => {
  const mutation = useRequestAirdrop({ address: publicKey });

  return (
    <button
      onClick={() => mutation.mutateAsync(1).catch(console.error)}
      className="text-lg"
      title="Request Airdrop"
    >
      🚰
    </button>
  );
};

export function NetworkSwitcher() {
  const { publicKey, connected } = useWallet();
  const { clusters, setCluster, cluster } = useCluster();

  const networkStatus = connected
    ? cluster.name === "mainnet"
      ? "mainnet"
      : "testnet"
    : "disconnected";

  return (
    <div className="flex items-center space-x-2">
      {publicKey && <AirdropButton publicKey={publicKey} />}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="btn p-2" title="Switch Network">
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
