import { Minus, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { MenuBar } from "./Menubar";

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

export const WindowWrapper: React.FC<WindowWrapperProps> = ({
  children,
  title,
  onClose,
  onMinimize,
  isMaximized,
  defaultPosition,
  zIndex,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const windowStyle = isMaximized
    ? "fixed inset-0 flex flex-col"
    : "absolute flex flex-col w-[600px]";

  return (
    <div
      className={`${windowStyle}  win-container bg-[#808080]`}
      style={{
        ...(!isMaximized ? { top: position.y, left: position.x } : {}),
        zIndex: 100 + zIndex,
      }}
    >
      <div
        className="bg-[#808080] text-black px-2 py-1 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="font-medium">{title}</span>
        <div className="flex gap-1">
          <button onClick={onMinimize}>
            <Minus className="h-3 w-3" />
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 text-black p-0.5 custom-border"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      <MenuBar />

      <div className="flex-1 overflow-auto bg-white win95-inset">
        <div className="p-4 min-h-64 flex items-center justify-center flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
