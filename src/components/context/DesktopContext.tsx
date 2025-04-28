import { createContext, useContext } from "react";

export const DesktopContext = createContext<{
  openWindow: (window: string) => void;
} | null>(null);

/* Desktop Context will be used to call to open an app window from any where in our app. Might expand this 🖥 */
export const useDesktop = () => {
  const ctx = useContext(DesktopContext);
  if (!ctx)
    throw new Error("useDesktop must be used within DesktopContext.Provider");
  return ctx;
};
