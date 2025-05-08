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
  help?: React.ComponentType;
}

export const WindowWrapper: React.FC<WindowWrapperProps> = ({
  children,
  title,
  onClose,
  onMinimize,
  isMaximized,
  defaultPosition,
  zIndex,
  help,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMenuSelect = (item: string) => {
    if (item === "Help") {
      setActiveMenu("Help");
    } else {
      setActiveMenu(null);
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

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && !isMaximized && !isExpanded) {
        const touch = e.touches[0];
        setPosition({
          x: touch.clientX - dragOffset.x,
          y: touch.clientY - dragOffset.y,
        });
      }
    };

    const stopDragging = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", stopDragging);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, dragOffset, isMaximized, isExpanded]);

  const windowStyle = isMaximized
    ? "fixed inset-0 flex flex-col"
    : isExpanded
    ? "absolute flex flex-col w-full h-full"
    : "absolute flex flex-col w-[800px]";

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
        onTouchStart={handleTouchStart}
        role="header"
        aria-live="polite"
      >
        <span className="font-medium">{title}</span>
        <div className="flex gap-1">
          <button
            onClick={onMinimize}
            aria-label="Minimize"
            className="bg-[#21C55D] text-black p-0.5 custom-border focus:outline-none"
          >
            <Minus className="h-3 w-3" />
          </button>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="bg-yellow-500 text-black p-0.5 custom-border focus:outline-none"
          >
            {isExpanded ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            className="bg-red-500 text-black p-0.5 custom-border focus:outline-none"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      <MenuBar onSelect={handleMenuSelect} activeItem={activeMenu} />

      <div
        className={`flex-1 overflow-auto bg-white win95-inset custom-scroll ${
          isExpanded ? "h-full" : "max-h-[700px]"
        }`}
      >
        <div className="h-full">
          {activeMenu === "Help" ? (
            help ? (
              React.createElement(help)
            ) : (
              <div className="min-h-60 flex items-center font-medium text-center justify-center flex-col px-4">
                <h2 className="text-xl">Help Not Found</h2>
                <p>
                  {" "}
                  We can't provide the help you need right now. Our writers dip
                  and the dev is probably sipping coffee somewhere and
                  pretending to be productive
                </p>
              </div>
            )
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};
