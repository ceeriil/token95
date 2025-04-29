import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const BirdEye = () => {
  const [loading, setLoading] = useState(true);

  const handleOpenInNewWindow = () => {
    window.open("https://birdeye.so/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-[25rem] h-full min-w-[50rem] border border-black bg-gray-100">
      <button
        onClick={handleOpenInNewWindow}
        className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-bold border border-black bg-white hover:bg-gray-200 active:bg-gray-300 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center"
      >
        Open app in new window
        <ArrowUpRight />
      </button>

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <span className="mb-2 text-sm font-bold">🧠 Loading BirdEye</span>
          <div className="w-40 h-4 border border-black bg-white">
            <div className="h-full w-1/2 bg-blue-500 animate-pulse" />
          </div>
        </div>
      )}

      <iframe
        src="https://birdeye.so/"
        title="BirdEye"
        width="100%"
        height="100%"
        className="bg-white min-h-[25rem]"
        style={{ border: "none" }}
        sandbox="allow-same-origin allow-scripts allow-forms"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
