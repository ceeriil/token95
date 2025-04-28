import { useEffect, useState } from "react";

const bootLines = [
  "Initializing Token98 engine...",
  "Loading $98 liquidity tanks...",
  "Verifying wallet signatures...",
  "Fetching freshest block data...",
  "Unwrapping SOL... careful now",
  "Minting some extra vibes...",
  "Syncing chain state... 98% done",
  "Booting the memepower reactor...",
  "Deploying spicy smart contracts...",
  "Calibrating the HODL mechanisms...",
  "Injecting some pure degen energy...",
  "Optimizing gas fees... still mid",
  "Setting up Token98 Overdrive Mode...",
  "Encrypting hot wallets... 🔥",
  "Finalizing tokenomics... probably",
  "Testing swap functions... success (kinda)",
  "Fetching metadata... it's gorgeous",
  "Token98 dashboard about to pop off...",
  "Bringing decentralized chaos online...",
  "Token98 system ready for liftoff 🚀",
];

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < bootLines.length) {
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        onDone();
      }, 1000);
    }
  }, [visibleCount]);

  return (
    <div className="bg-black text-white text-left text-bold h-screen p-6">
      {bootLines.slice(0, visibleCount).map((line, i) => (
        <p key={i} className="mb-1">
          {line}
        </p>
      ))}
    </div>
  );
}
