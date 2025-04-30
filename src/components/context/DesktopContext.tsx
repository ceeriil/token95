import { createContext, useContext } from "react";

export type AlertProps = {
  message: string;
  linkUrl?: string;
  linkText?: string;
};

type DesktopContextType = {
  openWindow: (window: string) => void;
  openAlert: (alert: AlertProps) => void;
};

export const DesktopContext = createContext<DesktopContextType | null>(null);

export const useDesktop = () => {
  const ctx = useContext(DesktopContext);
  if (!ctx)
    throw new Error("useDesktop must be used within DesktopContext.Provider");
  return ctx;
};
