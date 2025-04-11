import { useEffect, useState } from "react";

const bootLines = [
  "Initializing hypervisor virtual memory map allocation...",
  "Loading secure boot kernel modules into memory cache...",
  "Verifying digital signature for bootloader integrity...",
  "Mounting root filesystem to primary device partition...",
  "Checking system entropy levels for cryptographic ops...",
  "Injecting precompiled runtime daemons into sandbox...",
  "Boot sector verified. No anomalies detected.",
  "Enumerating connected peripherals via PCIe protocol...",
  "Detected input device: Logitech PS/2 compatible mouse.",
  "Detected input device: ANSI 104-key mechanical keyboard.",
  "Establishing encrypted link with local RPC services...",
  "Running self-diagnostics... All systems nominal.",
  "Spawning background threads for async task handlers...",
  "Generating temporary session keys for user handshake...",
  "Authenticating session using SHA-256 multi-factor hash...",
  "Access token granted. Permissions elevated.",
  "Loading user interface subsystems and core processes...",
  "Finalizing UI shell... Injecting components...",
  "Syncing local clock with global atomic time server...",
  "Launch sequence completed. System operational ✅",
];

export default function BootLoader() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < bootLines.length) {
      const timeout = setTimeout(() => {
        setVisibleCount(visibleCount + 1);
      }, 200);
      return () => clearTimeout(timeout);
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
