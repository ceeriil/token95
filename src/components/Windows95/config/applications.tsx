import { SolTransfer } from "../windows/SolTransfer";
import { About } from "../windows/About";
import { SwapPro } from "../windows/SwapPro";
import { VaultStepper } from "../windows/Vault98";
import { AddressBook } from "../windows/AddressBook";
import RiskScannerMainWindow from "../windows/RiskScanner";
import { UserWindow } from "../windows/Profile";

const icons = {
  SolTransfer: "transfer.png",
  jup: "jup.png",
  about: "about.png",
  vault: "vault.png",
  addressBook: "address.png",
  riskScanner: "risk.png",
};

export const applications = {
  transfer: {
    title: "Bank",
    icon: icons.SolTransfer,
    content: SolTransfer,
  },
  about: {
    title: "About",
    icon: icons.about,
    content: About,
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
    icon: icons.riskScanner,
    content: UserWindow,
  },
} as const;
