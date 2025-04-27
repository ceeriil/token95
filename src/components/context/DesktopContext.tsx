import { createContext, useContext } from "react";

export const DesktopContext = createContext<{
  openWindow: (window: string) => void;
} | null>(null);

export const useDesktop = () => {
  const ctx = useContext(DesktopContext);
  if (!ctx)
    throw new Error("useDesktop must be used within DesktopContext.Provider");
  return ctx;
};
