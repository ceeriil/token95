import { BraveBrower } from "../windows/BraveBrower";
import { Token } from "../windows/Token";

const icons = {
  braveBrowser: "braveLogo.png",
  token: "token.png",
};

export const applications = {
  about: {
    title: "Brave",
    icon: icons.braveBrowser,
    content: BraveBrower,
  },
  token: {
    title: "Token",
    icon: icons.token,
    content: Token,
  },
} as const;
