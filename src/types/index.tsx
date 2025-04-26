export interface Application {
  title: string;
  icon: string;
  content: React.ComponentType<any>;
}

export interface Applications {
  [key: string]: Application;
}

export interface Position {
  x: number;
  y: number;
}

export interface WindowProps {
  volume?: number;
  setVolume?: (volume: number) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
  currentTrack?: number;
  setCurrentTrack?: (track: number) => void;
}

/* @TokenReport Promise */
export interface ITokenReport {
  mint: string;
  tokenProgram: string;
  creator: string | null;
  creatorBalance: number;
  creatorTokens: any;
  detectedAt: string;
  events: any[];
  fileMeta: {
    description: string;
    name: string;
    symbol: string;
    image: string;
  };
  freezeAuthority: string | null;
  graphInsidersDetected: number;
  insiderNetworks: any;
  knownAccounts: Record<string, any>;
  lockerOwners: Record<string, any>;
  lockers: Record<string, any>;
  markets: {
    marketAddress: string;
    baseSymbol: string;
    quoteSymbol: string;
    price: number;
    // ...etc
  }[];
  mintAuthority: string | null;
  price: number;
  risks: any[];
  rugged: boolean;
  score: number;
  score_normalised: number;
  token: {
    mintAuthority: string | null;
    supply: number;
    decimals: number;
    isInitialized: boolean;
    freezeAuthority: string | null;
  };
  tokenMeta: {
    name: string;
    symbol: string;
    uri: string;
    mutable: boolean;
    updateAuthority: string;
  };
  tokenType: string;
  token_extensions: any;
  topHolders: {
    address: string;
    amount: number;
    percent: number;
  }[];
  totalHolders: number;
  totalLPProviders: number;
  totalMarketLiquidity: number;
  transferFee: {
    pct: number;
    maxAmount: number;
    authority: string;
  };
  verification: {
    mint: string;
    payer: string;
    name: string;
    symbol: string;
    description: string;
  };
}
