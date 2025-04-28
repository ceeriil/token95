import { FC, ReactNode, useMemo, useCallback } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { WalletError } from "@solana/wallet-adapter-base";

import "@solana/wallet-adapter-react-ui/styles.css";
import { useCluster } from "@/lib/cluster";

interface Props {
  children: ReactNode;
}

const CLIENT_ID = import.meta.env.VITE_CIVIC_CLIENT_ID;
if (!CLIENT_ID) throw new Error("CLIENT_ID is required");

export const CivicWalletProvider: FC<Props> = ({ children }) => {
  const { cluster } = useCluster();
  const endpoint = useMemo(() => cluster.endpoint, [cluster]);
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>
          <CivicAuthProvider
            clientId={CLIENT_ID}
            autoConnectEmbeddedWallet={false}
          >
            {children}
          </CivicAuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
