# 🖥️ Token98

Token98 is a retro Windows 98-style browser OS packed with mini decentralized tools designed for both crypto newbies and seasoned degens. It’s a playful yet powerful frontend webapp that simplifies blockchain interactions with an intuitive UX, while still offering advanced features for experienced users

---

## ✨ Features

- 🔐 **Token Locker** — Lock tokens securely.
- 📈 **DeScreener** — View real-time token price charts.
- 🔍 **Risk Scanner** — Get contract security reports using [dd.xyz](https://dd.xyz/).
- 🔄 **Jupiter Swap** — Embedded token swap via [Jupiter](https://jup.ag/) iframe.
- 📒 **Address Book** — Save frequently used addresses.
- 🚰 **Faucet** — Request test tokens when on testnet.
- **Wallet Manager** - Stripped down currently

> Upcoming:

- 🚀 Native token swap
- 🔥 Burn token & earn rent
- 💸 Airdrop & claim Claim Center
- 🏦 Stake tokens
- Portfolio Tracker
- AI assistant
- Wallet Health Check (Improvement to Riskscanner)
- At least one cool onchain game

> Thinking of

- Token Creator (Power Users), probably edit token meta
- Onchain Notifications / Activity Feed
- Contract Viewer Verifier-simplifed solscan for normies
- Push notification (but would require integrating a backend) - for existing app
- Leaderboard??
- A way to make this fun??

> Nice to have for personalization

- Theme
- Option for users to display apps shown on desktop and add extra inbuilt mini app (like an appstore)
- Widgets and option to pin stuff on desktop

NOTE: Trying to keep things simplified. This might include linking out to a more advanced version of certain apps or redirecting to the full experience when needed. MVP is considered complete once two of the upcoming features are live and UX + accessibility polish is finalized

---

## 🧠 Philosophy

Token98 is built for:

- **New Users** — A simplified help window guides users through tools and concepts in plain language.
- **Degens & Power Users** — Advanced features are tucked neatly under the hood for users who know what they’re doing.

We’ve also simplified the **auth flow** using [Civic Auth Web3](https://www.civic.com/), enabling users to:

- Log in with **GitHub** or **Google**, and automatically receive a wallet.
- Log in with **any existing wallet**.

---

## 🛠️ Getting Started

### 1. Prerequisites

- **Node.js** v18 or higher
- A `.env` file (see below)
- An RPC provider URL (e.g., [Helius](https://www.helius.dev/))
- Civic Client ID (from [Civic Developer Portal](https://docs.civic.com/auth))
- Webacy API Key (from [Webacy Dashboard](https://webacy.readme.io/))
- Webacy dd.xyz is used for risk scanning and transaction protection

### 2. Setup Instructions

```bash
# Clone the repo
git clone https://github.com/ceeriil/token95

cd token98

# Copy env file
cp .env.example .env

# Install dependencies
pnpm install  # or use npm or yarn if preferred

# Run dev server
pnpm run dev
```

---

## 🔐 Environment Variables

Make sure your `.env` file includes the following:

```env
VITE_MAINNET_RPC=your_helius_rpc_url
VITE_CIVIC_CLIENT_ID=your_civic_client_id
VITE_WEBACY_API_KEY=your_webacy_api_key
```

> 🧪 Testnet support included. When using devnet or testnet, the Faucet mini app will be available.

---

## 🖼️ UI & UX

Built with:

- 🪄 **React**
- 🪄 **Vite**
- 🎨 **TailwindCSS**
- 🌆 Retro Windows 98 aesthetic (think MS Paint meets DeFi)

---

## ⚙️ Architecture Highlights

- **Auth Adapter Layer** — Abstracts Civic + Web2 login + wallet login
- **Security Layer** — All critical functions (like locking or sending tokens) will be verified by dd.xyz

---

## 💡 Vision

We're making DeFi accessible without dumbing it down. Token98 is your funky, friendly Web3 OS that gets out of your way while helping you make smarter moves onchain.

---

## 🧑‍💻 Contributing

PRs, issues, and memes welcome. Fork, clone, go wild.

---

## 📄 License

MIT

---

## 👾 Stay updated

- Follow me logs on [Twitter](https://x.com/ceeriil) (I'll be dropping update here before we get a twitter account)
- Discord community comming soon

---

> built with caffeine, chaos, and a little bit of 90s nostalgia 💾
