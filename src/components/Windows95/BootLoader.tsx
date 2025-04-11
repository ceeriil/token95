import { useEffect, useState } from "react";

const bootLines = [
  "Initializing Hotdog cart...",
  "Loading mustard dispenser...",
  "Keptchup readt for action...",
  "Grilling Sausages.... 90% cooked",
  "Hotdog bun found... it's fresh",
  "Adding relish....can never have enough",
  "Checking the keptchup level...low",
  "Mustard bottle slighly overfilled",
  "Pepping the onions... 50% done",
  "Adding the onions... 100% done",
  "Hotdog cart ready for action...",
  "Sausages sizzling like a pro",
  "Mustard is on standby...",
  "Mustard on the right, Keptchup on the left",
  "Relish is ready to go...",
  "Hotdog taste test passed...",
  "Hotdog cart is ready to roll...",
  "Hotdog delivery system online...It's a go!",
  "Loading system files...",
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
