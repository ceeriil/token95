import { useState } from "react";
import { Desktop } from "./Desktop";
import { applications } from "./config/applications";

export const Windows95Layout = () => {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [showShutdown, setShowShutdown] = useState(false);
  const [time, setTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [minimized, setMinimized] = useState<Record<string, boolean>>({});

  return (
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
    </div>
  );
};
