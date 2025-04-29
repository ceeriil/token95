export interface ITokenInfoLinks {
  contractAddress: string;
}

export interface ITokenRisk {
  contract_address: string;
  expiresAt: number;
  illegal_unicode: boolean;
  is_pump_fun: boolean;
  is_trusted: boolean;
  solana_address_type: string;
  token_logo: string;
  token_name: string;
  token_standard: string;
  token_symbol: string;
}

export interface IThreatReportTag {
  description: string;
  key: string;
  name: string;
  severity: number;
  type: string;
}

export interface IThreatReportIssue {
  riskScore: string;
  score: number;
  tags: IThreatReportTag[];
}

export interface ITopHoldersReport {
  amount: number;
  percentage: number;
  ownerAddress: string;
  accountAddress: string;
}

export interface IAddressInfo {
  balance: number;
  expiresAt: number;
  has_no_balance: boolean;
  has_no_transactions: boolean;
  is_spam_sns: boolean;
  time_1st_tx: Date;
  time_verified: number;
  transaction_count: number;
  wash_trading: number;
}

export interface IThreatReportDetails {
  address_info: IAddressInfo;
  buy_sell_taxes: {
    has_buy_tax: boolean;
    has_sell_tax: boolean;
  };
  dev_launched_tokens_in_24_hours: number;
  marketData: {
    current_price: number;
    fully_diluted_valuation: number;
    total_volume: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    ownershipDistribution: {
      topHolders: ITopHoldersReport[];
    };
  };
  token_info: {
    links: ITokenInfoLinks;
  };
  token_metadata_risk: ITokenRisk;
  token_risk: ITokenRisk;
}

export interface IThreatReport {
  count: number;
  details: IThreatReportDetails;
  high: number;
  isContract: boolean;
  issues: IThreatReportIssue[];
  medium: number;
  overallRisk: number;
}

export interface IThreatReportResult {
  riskScore: string;
  isContract: string;
  washTradingScore: number | string;
  transactionCount: number | string;
  balance: number | string;
  hasNoBalance: string;
  spamSNS: string;
  issues: string[];
}

export interface ITokenReportResult {
  riskScore: string;
  logoUrl: string;
  tokenName: string;
  tokenSymbol: string;
  contractAddress: string;
  isPumpFun: boolean;
  issues: string[];
  currentPrice: number;
  ownershipDistribution: ITopHoldersReport[];
  devLaunchedToken24hr: number;
}
