import React from "react";

interface WindowWrapperProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
  isMaximized: boolean;
  defaultPosition: { x: number; y: number };
  zIndex: number;
}

export const WindowWrapper: React.FC<WindowWrapperProps> = () => {
  return (
    <div
      className={`${windowStyle} win95-window bg-[#c0c0c0]`}
      style={{
        ...(!isMaximized ? { top: position.y, left: position.x } : {}),
        zIndex: 100 + zIndex,
      }}
    >
      <div
        className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm flex items-center gap-2">
          <span className="text-lg">
            {title.split(" - ")[1]?.includes(".exe") ? "💾" : "📁"}
          </span>
          {title}
        </span>
        <div className="flex gap-1">
          <WindowButton onClick={onMinimize}>
            <Minus className="h-3 w-3" />
          </WindowButton>
          <WindowButton onClick={onMaximize}>
            <Square className="h-3 w-3" />
          </WindowButton>
          <WindowButton onClick={onClose}>
            <X className="h-3 w-3" />
          </WindowButton>
        </div>
      </div>

      <MenuBar />

      <div className="flex-1 overflow-auto bg-white win95-inset">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
