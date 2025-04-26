import { FC, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@solana/wallet-adapter-react-ui/styles.css";
import { clusterApiUrl } from "@solana/web3.js";
const client = new QueryClient();

const endpoint = clusterApiUrl("devnet");

interface Props {
  children: ReactNode;
}

const CLIENT_ID = import.meta.env.VITE_CIVIC_CLIENT_ID;
if (!CLIENT_ID) throw new Error("CLIENT_ID is required");

export const CivicWalletProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
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
    </QueryClientProvider>
  );
};
