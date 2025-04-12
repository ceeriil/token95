import { useState } from "react";
import {
  LogOut,
  Settings,
  HelpCircle,
  Power,
  User,
  FolderOpen,
  Terminal,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";
import type { Applications } from "../../types";

interface TaskBarProps {
  applications: Applications;
  activeWindows: Record<string, boolean>;
  minimized: Record<string, boolean>;
  windowOrder: string[];
  setWindowOrder: (order: string[]) => void;
  setMinimized: (
    fn: (prev: Record<string, boolean>) => Record<string, boolean>
  ) => void;
  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;
  time: Date;
  openWindow: (window: string) => void;
}

export function TaskBar({
  applications,
  activeWindows,
  minimized,
  windowOrder,
  setWindowOrder,
  setMinimized,
  startMenuOpen,
  setStartMenuOpen,
  time,
  openWindow,
}: TaskBarProps) {
  const handleTaskbarButtonClick = (window: string) => {
    if (minimized[window]) {
      setMinimized((prev) => ({ ...prev, [window]: false }));
    }
    setWindowOrder([...windowOrder.filter((w) => w !== window), window]);
  };

  return (
    <div className="text-black fixed bottom-0 left-0 h-12 px-2 bg-gray-400 z-[9999] w-full border border-white">
      <div className="flex items-center h-full">
        {/* Start Button */}
        <button
          className={`border px-4  border-black ${
            startMenuOpen ? "active" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuOpen(!startMenuOpen);
          }}
        >
          <span className="font-bold">Start</span>
        </button>

        {/* Active Windows */}
        <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto">
          {windowOrder.map(
            (window) =>
              activeWindows[window] && (
                <button
                  key={window}
                  className={`border px-4  border-black ${
                    windowOrder[windowOrder.length - 1] === window &&
                    !minimized[window]
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleTaskbarButtonClick(window)}
                >
                  <span className="text-lg">{applications[window].icon}</span>
                  <span className="truncate">
                    {applications[window].title.split(" - ")[0]}
                  </span>
                </button>
              )
          )}
        </div>

        <div>
          <span className="border border-black py-1 px-3 font-bold">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {startMenuOpen && (
        <div
          className="absolute bottom-[120%] left-2 w-64 bg-white border-black border shadow-md rounded-[0.5rem] "
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <StartMenuItem
              icon={<User className="h-4 w-4" />}
              text="About Me"
              onClick={() => {
                openWindow("about");
                setStartMenuOpen(false);
              }}
            />
            <StartMenuItem
              icon={<FolderOpen className="h-4 w-4" />}
              text="My Projects"
              onClick={() => {
                openWindow("projects");
                setStartMenuOpen(false);
              }}
            />
            <StartMenuItem
              icon={<Terminal className="h-4 w-4" />}
              text="Command Prompt"
              onClick={() => {
                openWindow("cmd");
                setStartMenuOpen(false);
              }}
            />

            <StartMenuItem
              icon={<LogOut className="h-4 w-4" />}
              text="Run..."
              onClick={() => {
                setStartMenuOpen(false);
                onRunClick();
              }}
            />
            <StartMenuItem
              icon={<Settings className="h-4 w-4" />}
              text="Settings"
              onClick={() => setStartMenuOpen(false)}
            />
            <StartMenuItem
              icon={<HelpCircle className="h-4 w-4" />}
              text="Help"
              onClick={() => setStartMenuOpen(false)}
            />

            <StartMenuItem
              icon={<Power className="h-4 w-4" />}
              text="Shut Down..."
              onClick={() => {
                setStartMenuOpen(false);
                handleShutdown();
              }}
              className="text-red-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface StartMenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
}

function StartMenuItem({
  icon,
  text,
  onClick,
  className = "",
}: StartMenuItemProps) {
  return (
    <button
      className={`h-10 py-1 px-2 flex justify-between items-center w-full border-b hover:bg-gray-400 ${className}`}
      onClick={onClick}
    >
      <span>{text}</span>
      <span className="">{icon}</span>
    </button>
  );
}
