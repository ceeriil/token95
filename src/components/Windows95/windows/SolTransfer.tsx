import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useTransferSol } from "@/lib/account";
import { fetchAddressThreatReport } from "@/services/webacy";

export const SolTransfer = () => {
  const { publicKey } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [riskMessage, setRiskMessage] = useState("");

  const transferMutation = useTransferSol({ address: publicKey! });

  /* We are checking address safetly with dd.xyz we can minimize the amount of scam transaction likely to happen. If for any reason fetch fail return a friendly warning message and allow them proceed with caution ⚠️ */
  const checkAddressSafety = async (address: string) => {
    try {
      const data = await fetchAddressThreatReport(address);
      if (!data) {
        throw new Error("Risk data fetch failed.");
      }

      const { address_info } = data.details || {};
      if (!address_info) {
        throw new Error("No address info found.");
      }

      const balance = address_info.balance ?? 0;
      const isSpam = address_info.is_spam_sns ?? false;
      const threatScore = data.overallRisk ?? 0;

      const warnings: string[] = [];

      if (balance === 0 || address_info.has_no_balance) {
        warnings.push("⚠️ Address has **no balance**.");
      }

      if (threatScore > 30) {
        warnings.push(
          `⚠️ Threat Score is **${Math.round(threatScore)}%**, which is risky.`
        );
      }

      if (isSpam) {
        warnings.push("⚠️ Address is flagged as **SPAM**.");
      }

      if (warnings.length > 0) {
        setRiskMessage(warnings.join(" "));
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error checking safety:", err);
      setRiskMessage("Unable to verify risk. Proceed carefully! ⚠️");
      return false;
    }
  };

  /* Transfer SOL out of wallet. We check for immportant test cases before we proceed. Only show confirmation modal if recieving address is sus 🤨*/
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      setStatus("Invalid destination address.");
      return;
    }

    /* Not an effective way to perform input valid. lazy af. TODO: move 
     to zod */
    const lamports = parseFloat(amount);
    if (isNaN(lamports) || lamports <= 0) {
      setStatus("Amount must be a positive number.");
      return;
    }

    setStatus(`Checking risk for ${walletAddress}...`);

    const isSafe = await checkAddressSafety(walletAddress);
    if (!isSafe) {
      setShowConfirmation(true);
    } else {
      proceedTransfer(destination, lamports);
    }
  };

  /* Main func to handle transfer. funds leave our wallet to whoever we are transfering our SOL to ☹️*/
  const proceedTransfer = (destination: PublicKey, lamports: number) => {
    setStatus(`Transferring ${lamports} SOL to ${destination.toBase58()}...`);
    transferMutation.mutate(
      {
        destination,
        amount: lamports,
      },
      {
        onSuccess: () => {
          setStatus("Transfer complete! 🎉");
          setShowConfirmation(false);
        },
        onError: () => {
          setStatus("Transfer failed 😔");
          setShowConfirmation(false);
        },
      }
    );
  };

  /* This is self explanatory */
  const handleConfirm = async () => {
    setShowConfirmation(false);
    const destination = new PublicKey(walletAddress);
    const lamports = parseFloat(amount);
    proceedTransfer(destination, lamports);
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

        {showConfirmation && (
          <div className="mt-4 p-4 border border-red-500 bg-red-100 text-red-700">
            <p className="text-sm mb-2 font-semibold">
              🚨 Warning before proceeding:
            </p>
            <p className="text-xs">{riskMessage}</p>
            <div className="flex mt-4 space-x-2">
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 bg-green-600 text-white text-sm shadow-[2px_2px_0_#000] hover:bg-green-700"
              >
                Proceed Anyway
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 bg-gray-600 text-white text-sm shadow-[2px_2px_0_#000] hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
