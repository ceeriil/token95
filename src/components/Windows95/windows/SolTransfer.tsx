import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useTransferSol } from "@/lib/account";
import toast from "react-hot-toast";

export const SolTransfer = () => {
  const { publicKey } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const transferMutation = useTransferSol({ address: publicKey! });

  const handleTransfer = async () => {
    if (!walletAddress || !amount) {
      setStatus("Enter a valid wallet and amount!");
      return;
    }

    if (!publicKey) {
      setStatus("Wallet not connected.");
      return;
    }

    let destination: PublicKey;
    try {
      destination = new PublicKey(walletAddress);
    } catch (err) {
      setStatus("Invalid destination address.");
      return;
    }

    const lamports = parseFloat(amount);
    if (isNaN(lamports) || lamports <= 0) {
      setStatus("Amount must be a positive number.");
      return;
    }

    setStatus(`Transferring ${amount} SOL to ${walletAddress}...`);

    transferMutation.mutate(
      {
        destination,
        amount: lamports,
      },
      {
        onSuccess: () => {
          setStatus("Transfer complete! 🎉");
        },
        onError: () => {
          setStatus("Transfer failed 😔");
        },
      }
    );
  };

  return (
    <div className="w-full bg-gray-100 h-full py-3">
      <div className="p-4">
        <label className="block text-sm mb-1 text-left font-semibold">
          Recipient Wallet:
        </label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="w-full p-1.5 border border-black bg-white text-sm font-mono"
          placeholder="Enter wallet address"
        />

        <label className="block text-sm mt-4 mb-1 text-left font-semibold">
          Amount (SOL):
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-1.5 border border-black bg-white text-sm font-mono"
          placeholder="Enter amount"
        />

        <button
          onClick={handleTransfer}
          className="mt-4 w-full border border-black bg-blue-500 hover:bg-blue-600 text-white text-sm shadow-[2px_2px_0_#000] py-2 disabled:opacity-50"
          disabled={transferMutation.isPending}
        >
          {transferMutation.isPending ? "Sending..." : "Send SOL"}
        </button>

        {status && (
          <p className="mt-4 text-xs bg-yellow-100 border border-yellow-600 p-2">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};
