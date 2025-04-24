import { useState } from "react";

export const SolTransfer = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = () => {
    if (!walletAddress || !amount) {
      setStatus("Enter a valid wallet and amount!");
      return;
    }
    setStatus(`Transferring ${amount} SOL to ${walletAddress}...`);
    setTimeout(() => {
      setStatus("Transfer complete! 🎉");
    }, 2000);
  };

  return (
    <div className="w-full  bg-gray-100 h-full py-3">
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
          className="mt-4 w-full border border-black bg-blue-500 hover:bg-blue-600 text-white text-sm shadow-[2px_2px_0_#000] py-2"
        >
          Send SOL
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
