import { FC, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CivicAuthProvider } from "@civic/auth-web3/react";

import "@solana/wallet-adapter-react-ui/styles.css";

const endpoint = "https://api.mainnet-beta.solana.com";

interface Props {
  children: ReactNode;
}

const CLIENT_ID = import.meta.env.VITE_CIVIC_CLIENT_ID;
if (!CLIENT_ID) throw new Error("CLIENT_ID is required");

export const CivicWalletProvider: FC<Props> = ({ children }) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <CivicAuthProvider clientId={CLIENT_ID}>{children}</CivicAuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
