import { BraveBrower } from "../windows/BraveBrower";
import { Token } from "../windows/Token";
import { About } from "../windows/About";

const icons = {
  braveBrowser: "braveLogo.png",
  token: "token.png",
  about: "about.jpeg",
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
} as const;
