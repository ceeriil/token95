import { BraveBrower } from "../windows/BraveBrower";
import { Token } from "../windows/Token";

const icons = {
  braveBrowser: "👤",
  token: "💼",
};

export const applications = {
  about: {
    title: "Brave Browser",
    icon: icons.braveBrowser,
    content: BraveBrower,
  },
  token: {
    title: "Token",
    icon: icons.token,
    content: Token,
  },
} as const;
