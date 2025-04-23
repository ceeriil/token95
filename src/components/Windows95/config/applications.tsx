import { BraveBrower } from "../windows/BraveBrower";
import { Token } from "../windows/Token";
import { About } from "../windows/About";
import { SwapPro } from "../windows/SwapPro";
import { VaultStepper } from "../windows/Vault98";
import { AddressBook } from "../windows/AddressBook";

const icons = {
  braveBrowser: "braveLogo.png",
  token: "token.png",
  jup: "jup.png",
  about: "about.jpeg",
  vault: "vault.png",
  addressBook: "address.png",
};

export const applications = {
  transfer: {
    title: "Brave",
    icon: icons.braveBrowser,
    content: BraveBrower,
  },
  token: {
    title: "Token",
    icon: icons.token,
    content: Token,
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
} as const;
