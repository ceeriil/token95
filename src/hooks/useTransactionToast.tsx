import toast from "react-hot-toast";

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={"text-center"}>
        <div className="text-lg">Transaction sent</div>
        <div className="text-sm">
          <a
            href={`https://explorer.solana.com/tx/${signature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            View on Explorer
          </a>
        </div>
      </div>
    );
  };
}
