import { useState, useEffect } from "react";
import { Desktop } from "./Desktop";
import { applications } from "./config/applications";
import { useWindowControl } from "../../hooks/useWindowControl";
import { TaskBar } from "./TaskBar";
import { ContextMenu } from "./ContextMenu";
import { DesktopContext } from "../context/DesktopContext";
import { AlertWindow } from "./windows/AlertWindow";
import type { AlertProps } from "../context/DesktopContext";

export const Windows95Layout = () => {
  const [time, setTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [minimized, setMinimized] = useState<Record<string, boolean>>({});
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const {
    activeWindows,
    maximized,
    windowOrder,
    openWindow,
    closeWindow,
    setMaximized,
    setWindowOrder,
  } = useWindowControl();

  const openAlert = (alertData: AlertProps) => setAlert(alertData);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <DesktopContext.Provider value={{ openWindow, openAlert }}>
      <div
        className="h-screen w-full bg-[#008080] overflow-hidden relative"
        onClick={() => {
          setContextMenu({ show: false, x: 0, y: 0 });
          setStartMenuOpen(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({
            show: true,
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        <Desktop
          applications={applications}
          activeWindows={activeWindows}
          maximized={maximized}
          minimized={minimized}
          windowOrder={windowOrder}
          openWindow={openWindow}
          closeWindow={closeWindow}
          setMaximized={setMaximized}
          setMinimized={setMinimized}
        />

        <TaskBar
          applications={applications}
          activeWindows={activeWindows}
          minimized={minimized}
          windowOrder={windowOrder}
          setWindowOrder={setWindowOrder}
          setMinimized={setMinimized}
          startMenuOpen={startMenuOpen}
          setStartMenuOpen={setStartMenuOpen}
          time={time}
          openWindow={openWindow}
        />

        {alert && (
          <AlertWindow
            message={alert.message}
            linkText={alert.linkText}
            linkUrl={alert.linkUrl}
            onClose={() => setAlert(null)}
          />
        )}

        {contextMenu.show && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y} />
        )}
      </div>
    </DesktopContext.Provider>
  );
};
