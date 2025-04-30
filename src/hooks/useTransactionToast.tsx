import { ToastAction } from "@/components/ui/toast";
import { toast } from "./use-toast";

export function useTransactionToast() {
  return (signature: string) => {
    toast({
      title: "✅ Transaction sent",
      description: (
        <a
          href={`https://explorer.solana.com/tx/${signature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          View on Solana Explorer
        </a>
      ),
      action: (
        <ToastAction
          altText="View on Explorer"
          onClick={() =>
            window.open(`https://explorer.solana.com/tx/${signature}`, "_blank")
          }
        >
          Open
        </ToastAction>
      ),
    });
  };
}
