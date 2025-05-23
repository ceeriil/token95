import type { Applications } from "../../types";
import { NetworkSwitcher } from "../NetworkSwitcher";

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
    <div className="text-black fixed bottom-0 left-0 h-9 px-2 bg-[#B4B4B4] z-[99s] w-full border border-white">
      <div className="flex items-center h-full">
        <button
          className={`border flex flex-col items-center justify-center h-[88%] px-3  border-t-white border-r-white  border-b-black border-l-black  ${
            startMenuOpen ? "active" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuOpen(!startMenuOpen);
          }}
        >
          <span className="font-bold">Start</span>
        </button>

        <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto h-full">
          {windowOrder.map(
            (window) =>
              activeWindows[window] && (
                <button
                  key={window}
                  className={`border flex flex-col items-center justify-center h-[88%] px-3  border-t-white border-r-black  border-b-black border-l-white rounded text-sm font-medium transition hover:bg-[#888]${
                    windowOrder[windowOrder.length - 1] === window &&
                    !minimized[window]
                      ? "bg-[#888]"
                      : ""
                  }`}
                  onClick={() => handleTaskbarButtonClick(window)}
                >
                  <span className="truncate">
                    {applications[window].title.split(" - ")[0]}
                  </span>
                </button>
              )
          )}
        </div>

        <div className="flex space-x-2">
          <NetworkSwitcher />
          <span className="border my-0.5 py-0.5 px-3 font-bold font-mono">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {startMenuOpen && (
        <div
          className="absolute bottom-[120%] left-2 w-64 bg-white border-black border shadow-md rounded-[0.5rem]  "
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <StartMenuItem
              text="Profile"
              onClick={() => {
                openWindow("profile");
                setStartMenuOpen(false);
              }}
            />
            <StartMenuItem
              text="About"
              onClick={() => {
                openWindow("about");
                setStartMenuOpen(false);
              }}
            />
            <StartMenuItem
              text="Github"
              onClick={() => {
                window.open("https://github.com/ceeriil/token95", "_blank");
                setStartMenuOpen(false);
              }}
            />

            <StartMenuItem
              text="Suggest a feature"
              onClick={() => {
                window.open(
                  "https://github.com/ceeriil/token95/issues",
                  "_blank"
                );
                setStartMenuOpen(false);
              }}
            />

            <StartMenuItem
              text="Restart"
              onClick={() => {
                setStartMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface StartMenuItemProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

function StartMenuItem({ text, onClick, className = "" }: StartMenuItemProps) {
  return (
    <button
      className={`h-10 py-1 px-2 flex justify-between items-center w-full border-b hover:bg-gray-400 last:border-b-0 last:rounded-b-[0.4rem] first:rounded-t-[0.4rem] ${className}`}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}
