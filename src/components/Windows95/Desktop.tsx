import { useState } from "react";
import type { Applications, Position } from "../../types";
import { DesktopIcon } from "./DesktopIcon";
import { WindowWrapper } from "./WindowWrapper";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Balance } from "../Balance";
import { useWallet } from "@solana/wallet-adapter-react";
import { DesktopContext } from "../context/DesktopContext";

interface DesktopProps {
  applications: Applications;
  activeWindows: Record<string, boolean>;
  maximized: Record<string, boolean>;
  minimized: Record<string, boolean>;
  windowOrder: string[];
  openWindow: (window: string) => void;
  closeWindow: (window: string) => void;
  setMaximized: (
    fn: (prev: Record<string, boolean>) => Record<string, boolean>
  ) => void;
  setMinimized: (
    fn: (prev: Record<string, boolean>) => Record<string, boolean>
  ) => void;
}

export const Desktop: React.FC<DesktopProps> = ({
  applications,
  activeWindows,
  maximized,
  minimized,
  windowOrder,
  openWindow,
  closeWindow,
  setMaximized,
  setMinimized,
}) => {
  const { publicKey } = useWallet();
  const iconSpacing = 80;
  const iconsPerColumn = Math.floor((window.innerHeight - 100) / iconSpacing);

  /* Default desktop icon position but no worries, can drag it to wherever the hell you want. Adjust spacing as you wish 🪄 */
  const [iconPositions, setIconPositions] = useState<Record<string, Position>>(
    () => {
      const positions: Record<string, Position> = {};
      Object.keys(applications).forEach((key, index) => {
        const column = Math.floor(index / iconsPerColumn);
        const row = index % iconsPerColumn;
        positions[key] = {
          x: 20 + column * iconSpacing,
          y: 20 + row * iconSpacing,
        };
      });
      return positions;
    }
  );

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  /* when icon is dropped we get the id of dragged item and we figure out where they drop it based on it relative container. ensure iconsstay in visible window and update in state 👊🏽 */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const gridSize = 20;
    const snappedX = Math.round(x / gridSize) * gridSize;
    const snappedY = Math.round(y / gridSize) * gridSize;

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 150;
    const boundedX = Math.max(0, Math.min(snappedX, maxX));
    const boundedY = Math.max(0, Math.min(snappedY, maxY));

    setIconPositions((prev) => ({
      ...prev,
      [id]: { x: boundedX, y: boundedY },
    }));
  };

  return (
    <DesktopContext.Provider value={{ openWindow }}>
      <div
        className="min-h-screen bg-[#B0C4DE] relative overflow-hidden text-black"
        style={{
          backgroundImage: "url('/img/token95.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "35%",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="absolute right-3 top-4 btn-container flex items-center btn-wrapper">
          {publicKey && <Balance address={publicKey} />}

          <WalletMultiButton className="connect-btn" />
        </div>

        {Object.entries(applications)
          .filter(([, app]) => app.showOnDesktop !== false)
          .map(([key, app]) => (
            <div
              key={key}
              className="absolute"
              style={{
                left: iconPositions[key]?.x || 0,
                top: iconPositions[key]?.y || 0,
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, key)}
            >
              <DesktopIcon
                label={app.title.split(" - ")[0]}
                icon={app.icon}
                onClick={() => openWindow(key)}
              />
            </div>
          ))}
        {Object.entries(applications).map(
          ([key, app]) =>
            activeWindows[key] &&
            !minimized[key] && (
              <WindowWrapper
                key={key}
                title={app.title}
                onClose={() => closeWindow(key)}
                onMaximize={() =>
                  setMaximized((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                onMinimize={() =>
                  setMinimized((prev) => ({ ...prev, [key]: true }))
                }
                isMaximized={maximized[key]}
                defaultPosition={{
                  x: 50 + windowOrder.indexOf(key) * 30,
                  y: 50 + windowOrder.indexOf(key) * 30,
                }}
                zIndex={windowOrder.indexOf(key)}
              >
                <app.content />
              </WindowWrapper>
            )
        )}
      </div>
    </DesktopContext.Provider>
  );
};
