import { useState, useEffect } from "react";
import { Copy, Send, Wallet } from "lucide-react";
import { useDesktop } from "@/components/context/DesktopContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { Tokens } from "./Tokens";
import { Address } from "@/components/Address";

export const UserWindow = () => {
  const [address, setAddress] = useState<string>("");
  const [solBalance, setSolBalance] = useState<number>(0);
  const [tokens, setTokens] = useState<{ symbol: string; balance: number }[]>(
    []
  );
  const { publicKey } = useWallet();
  const { openWindow: openWindowFn } = useDesktop();

  // Mock fetching user's data
  useEffect(() => {
    // fake address
    const fakeAddress = "9x9jv9fj93jf93jf93jf93jf9j3";
    setAddress(fakeAddress);

    // fake SOL balance
    const fakeSolBalance = 2.34;
    setSolBalance(fakeSolBalance);

    const fakeTokens = [
      { symbol: "USDC", balance: 100 },
      { symbol: "BONK", balance: 999999 },
      { symbol: "SAMO", balance: 4200 },
    ];
    setTokens(fakeTokens);
  }, []);

  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`;

  return (
    <div className="bg-gray-100  p-4 text-xs w-full">
      <div className="flex flex-col items-center mb-4">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-16 h-16 border-2 border-black bg-white mb-2"
        />
        <div className="flex items-center gap-2 text-[0.7rem] text-gray-800">
          {publicKey ? (
            <Address
              address={publicKey.toString()}
              type="account"
              className="text-lg font-medium"
            />
          ) : (
            "Anonymous"
          )}
        </div>
      </div>

      {/* Balance */}
      <div className="flex justify-between items-center border-t-2 border-black pt-2 mb-2">
        <span className="font-bold text-sm">SOL Balance:</span>
        <div className="flex items-center gap-1">
          <Wallet className="w-4 h-4" />
          <span>{solBalance.toFixed(2)} SOL</span>
        </div>
      </div>

      <button
        onClick={() => openWindowFn("transfer")}
        className="w-full mb-4 border-2 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-[2px_2px_0_#000] py-2 active:translate-x-[2px] active:translate-y-[2px]"
      >
        🚀 Transfer SOL
      </button>

      {publicKey && <Tokens address={publicKey} />}
    </div>
  );
};
