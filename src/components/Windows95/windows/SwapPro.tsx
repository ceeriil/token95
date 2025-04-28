import { useState } from "react";

export const SwapPro = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-[25rem] border border-black bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <span className="mb-2 text-sm font-bold">
            🧠 Loading SwapPro.exe...
          </span>
          <div className="w-40 h-4 border border-black bg-white">
            <div className="h-full w-1/2 bg-blue-500 animate-pulse" />
          </div>
        </div>
      )}

      <iframe
        src="https://jup.ag/swap"
        title="Jupiter Swap"
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
