import "@solana/wallet-adapter-react-ui/styles.css";

import { GambaPlatformProvider, TokenMetaProvider } from "gamba-react-ui-v2";
import { GambaProvider, SendTransactionProvider } from "gamba-react-v2";
import React from "react";

import {
  DEFAULT_POOL,
  PLATFORM_CREATOR_ADDRESS,
  PLATFORM_CREATOR_FEE,
  PLATFORM_JACKPOT_FEE,
  PLATFORM_REFERRAL_FEE,
  TOKEN_METADATA,
  TOKEN_METADATA_FETCHER,
} from "@/components/Windows95/windows/Games/constants";

interface Props {
  children: React.ReactNode;
}

export const GameProvider: React.FC<Props> = ({ children }) => {
  return (
    <TokenMetaProvider tokens={TOKEN_METADATA} fetcher={TOKEN_METADATA_FETCHER}>
      <SendTransactionProvider priorityFee={400_201}>
        <GambaProvider>
          <GambaPlatformProvider
            creator={PLATFORM_CREATOR_ADDRESS}
            defaultCreatorFee={PLATFORM_CREATOR_FEE}
            defaultJackpotFee={PLATFORM_JACKPOT_FEE}
            defaultPool={DEFAULT_POOL}
            referral={{
              fee: PLATFORM_REFERRAL_FEE,
              prefix: "code",
            }}
          >
            {children}
          </GambaPlatformProvider>
        </GambaProvider>
      </SendTransactionProvider>
    </TokenMetaProvider>
  );
};
