import { useState } from "react";

export function useWindowControl() {
  const [activeWindows, setActiveWindows] = useState<Record<string, boolean>>(
    {}
  );
  const [maximized, setMaximized] = useState<Record<string, boolean>>({});
  const [windowOrder, setWindowOrder] = useState<string[]>([]);

  const openWindow = (window: string) => {
    console.log("hmm");
    setActiveWindows((prev) => ({ ...prev, [window]: true }));
    console.log("hmm2", window, activeWindows);
    setWindowOrder((prev) => [...prev.filter((w) => w !== window), window]);
  };

  const closeWindow = (window: string) => {
    setActiveWindows((prev) => ({ ...prev, [window]: false }));
    setWindowOrder((prev) => prev.filter((w) => w !== window));
  };

  return {
    activeWindows,
    maximized,
    windowOrder,
    openWindow,
    closeWindow,
    setMaximized,
    setWindowOrder,
  };
}
