import { useState } from "react";
import type { Applications, Position } from "../../types";
import { DesktopIcon } from "./DesktopIcon";

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
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTrack: number;
  setCurrentTrack: (track: number) => void;
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
  const iconSpacing = 80;
  const iconsPerColumn = Math.floor((window.innerHeight - 100) / iconSpacing);

  // Store icon positions in state
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Snap to grid
    const gridSize = 20;
    const snappedX = Math.round(x / gridSize) * gridSize;
    const snappedY = Math.round(y / gridSize) * gridSize;

    // Keep icons within bounds
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
    <div
      className="min-h-screen bg-red-300 relative overflow-hidden text-black"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {Object.entries(applications).map(([key, app]) => (
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
            onClick={() => {
              openWindow(key);
            }}
          />
        </div>
      ))}
    </div>
  );
};
