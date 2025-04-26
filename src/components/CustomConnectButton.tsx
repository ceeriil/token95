import {
  useWalletModal,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export const CustomConnectButton = () => {
  const { visible, setVisible } = useWalletModal();
  const { connecting, connected, disconnect } = useWallet();

  const handleClick = () => {
    if (!connected) setVisible(true);
  };

  const handleCancel = async () => {
    await disconnect();
  };

  return (
    <>
      {!connected && !connecting && (
        <button
          onClick={handleClick}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Connect Wallet
        </button>
      )}

      {connecting && (
        <button
          onClick={handleCancel}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
        >
          Connecting... (Cancel?)
        </button>
      )}
    </>
  );
};
