import { SolTransfer } from "../windows/SolTransfer";
import { About } from "../windows/About/About";
import { SwapPro } from "../windows/SwapPro";
import { VaultStepper } from "../windows/Vault98";
import { AddressBook } from "../windows/AddressBook";
import RiskScannerMainWindow from "../windows/RiskScanner";
import { UserWindow } from "../windows/Profile";
import { UserManual } from "../windows/UserManual";
import { BirdEye } from "../windows/BirdEye";
import { Vault98Guide } from "../windows/Vault98/guide";
import { AboutGuide } from "../windows/About/guide"; //this is way too lazy but I'm trying to do alot at the moment
import { Theme } from "../windows/Theme";
import Games from "../windows/Games";

const icons = {
  SolTransfer: "transfer.png",
  jup: "jup.png",
  about: "about.png",
  vault: "vault.png",
  addressBook: "address.png",
  riskScanner: "scanner.png",
  userManual: "manual.png",
  profile: "profile.png",
  birdEye: "birdeye.png",
  games: "games.png",
};

/* All our mini app will be exported here. TODO: expand this to include help manual 📖 and boolean value to tell if we show on desktop or not 🗿*/
export const applications = {
  about: {
    title: "About",
    icon: icons.about,
    content: About,
    guideBook: AboutGuide,
  },
  transfer: {
    title: "Bank",
    icon: icons.SolTransfer,
    content: SolTransfer,
  },
  SwapPro: {
    title: "SwapPro",
    icon: icons.jup,
    content: SwapPro,
  },
  Vault98: {
    title: "Vault98",
    icon: icons.vault,
    content: VaultStepper,
    guideBook: Vault98Guide,
  },
  AddressBook: {
    title: "Address Book",
    icon: icons.addressBook,
    content: AddressBook,
  },
  riskScanner: {
    title: "Risk Scanner",
    icon: icons.riskScanner,
    content: RiskScannerMainWindow,
  },
  profile: {
    title: "Profile",
    icon: icons.profile,
    content: UserWindow,
    showOnDesktop: false,
  },
  UserManual: {
    title: "User Manual",
    icon: icons.userManual,
    content: UserManual,
  },
  BirdEye: {
    title: "BirdEye",
    icon: icons.birdEye,
    content: BirdEye,
  },
  themes: {
    title: "Themes",
    icon: icons.birdEye,
    content: Theme,
    showOnDesktop: false,
  },
  games: {
    title: "Games",
    icon: icons.games,
    content: Games,
  },
} as const;
