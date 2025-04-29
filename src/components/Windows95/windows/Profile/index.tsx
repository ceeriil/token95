import { Wallet } from "lucide-react";
import { useDesktop } from "@/components/context/DesktopContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { Tokens } from "./Tokens";
import { Address } from "@/components/Address";
import { DicebearAvatar } from "@/components/DicebearAvatar";
import { Balance } from "@/components/Balance";

export const UserWindow = () => {
  const { publicKey } = useWallet();
  const { openWindow: openWindowFn } = useDesktop();

  //clean this astrocity below later

  return (
    <div className="bg-gray-100  p-4 text-xs w-full">
      <div className="flex flex-col items-center mb-4">
        {publicKey ? (
          <DicebearAvatar seed={publicKey.toString()} />
        ) : (
          <DicebearAvatar seed="" />
        )}

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

      <div className="flex justify-between items-center border-t-2 border-black pt-2 mb-2">
        <span className="font-bold text-sm">SOL Balance:</span>
        <div className="flex items-center gap-1">
          <Wallet className="w-4 h-4" />
          {publicKey && <Balance address={publicKey} className="text-sm" />}
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
