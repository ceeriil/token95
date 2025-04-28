import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClusterProvider } from "@/lib/cluster";
import { CivicWalletProvider } from "./CivicWalletProvider";

const client = new QueryClient();

interface Props {
  children: ReactNode;
}

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <ClusterProvider>
        <CivicWalletProvider>{children}</CivicWalletProvider>
      </ClusterProvider>
    </QueryClientProvider>
  );
};
