import type { Applications } from "../../types";

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

export const Desktop: React.FC<DesktopProps> = () => {
  return (
    <div className="min-h-screen bg-[#008080] relative overflow-hidden">
      Desktop
    </div>
  );
};
