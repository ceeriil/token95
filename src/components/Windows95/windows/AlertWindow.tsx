import React from "react";
import { X } from "lucide-react";

export interface AlertWindowProps {
  message: string;
  onClose: () => void;
  linkText?: string;
  linkUrl?: string;
}

export const AlertWindow: React.FC<AlertWindowProps> = ({
  message,
  onClose,
  linkText = "Suggest a feature",
  linkUrl = "#",
}) => {
  return (
    <div className="fixed inset-0 z-[999] bg-black bg-opacity-30 flex items-center justify-center">
      <div className="w-[400px] border-2 border-black shadow-lg win-container bg-gray-300">
        <div
          className="bg-gray-300 text-black px-2 py-1 flex justify-between items-center cursor-move select-none "
          role="header"
          aria-live="polite"
        >
          <span className="font-medium">Alert</span>
          <div className="flex gap-1">
            <button
              onClick={onClose}
              aria-label="Close"
              className="bg-red-500 text-black p-0.5 custom-border focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div className=" bg-white win95-inset p-5">
          <div className="text-black text-sm font-medium mb-4">
            <p className="mb-2">{message}</p>
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700 hover:text-blue-900"
            >
              {linkText}
            </a>
          </div>
          <div className="text-right">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 custom-border px-3 py-1 text-black text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
