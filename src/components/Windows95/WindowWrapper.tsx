import { Minus, X, Maximize2, Minimize2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { MenuBar } from "./Menubar";

interface WindowWrapperProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
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
  const [isExpanded, setIsExpanded] = useState(false);

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
      if (isDragging && !isMaximized && !isExpanded) {
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
  }, [isDragging, dragOffset, isMaximized, isExpanded]);

  const windowStyle = isMaximized
    ? "fixed inset-0 flex flex-col"
    : isExpanded
    ? "absolute flex flex-col w-full h-full"
    : "absolute flex flex-col w-[600px]";

  return (
    <div
      className={`${windowStyle} win-container bg-gray-300`}
      style={{
        ...(!isMaximized && !isExpanded
          ? { top: position.y, left: position.x }
          : {}),
        zIndex: 100 + zIndex,
      }}
    >
      <div
        className="bg-gray-300 text-black px-2 py-1 flex justify-between items-center cursor-move select-none "
        onMouseDown={handleMouseDown}
        role="header"
        aria-live="polite"
      >
        <span className="font-medium">{title}</span>
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            aria-label="Minimize"
            className="focus:outline-none"
          >
            <Minus className="h-3 w-3" />
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            className="bg-red-500 text-black p-0.5 custom-border focus:outline-none"
          >
            <X className="h-3 w-3" />
          </button>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="focus:outline-none"
          >
            {isExpanded ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      <MenuBar />

      <div className="flex-1 overflow-auto bg-white win95-inset">
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};
