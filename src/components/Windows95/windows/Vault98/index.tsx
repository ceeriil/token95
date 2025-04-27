import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { Configuration, Recipients, Review } from "./steps";
import { useWallet } from "@solana/wallet-adapter-react";

const steps = ["Configuration", "Recipients", "Review"];

export const VaultStepper = () => {
  const [step, setStep] = useState(0);
  const wallet = useWallet();
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);

  const methods = useForm({
    defaultValues: {
      token: "",
      amount: "",
      duration: "",
    },
  });

  /*   const onSubmit = async () => {
    if (!wallet.connected) {
      try {
        await wallet.connect();
      } catch (error) {
        console.error("Wallet connection failed:", error);
        return;
      }
    }
    const isValid = await methods.trigger();
    if (isValid) {
      setIsTransactionLoading(true);
      const { recipient, tokenAmount, unlockDate } = methods.getValues();

      const totalAmountInLamports = getBN(tokenAmount, 6);
      const unlockDurationInSeconds = convertUnlockDateToSeconds(unlockDate);

      const createStreamParams = {
        recipient,
        tokenId: "45EgCwcPXYagBC7KqBin4nCFgEZWN7f3Y6nACwxqMCWX",
        start: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
        amount: totalAmountInLamports,
        period: unlockDurationInSeconds,
        cliff: getCurrentTimestampInSeconds() + unlockDurationInSeconds,
        cliffAmount: totalAmountInLamports,
        amountPerPeriod: totalAmountInLamports,
        name: "MOUTAI TOKEN LOCK",
        canTopup: false,
        cancelableBySender: false,
        cancelableByRecipient: false,
        transferableBySender: false,
        transferableByRecipient: false,
        automaticWithdrawal: false,
        withdrawalFrequency: 0,
        partner: undefined,
      };

      await createStream(
        createStreamParams,
        {
          sender: wallet as unknown as Keypair,
          isNative: false,
        },
        (stream) => {
          showMessage(`${stream.txId} created successfully.`, "success");
          router.push("/lock");
        },
        (error) => {
          showMessage(`${error}`, "error");
        }
      );
      setIsTransactionLoading(false);
    }
  }; */

  const StepComponent = [
    <Configuration key="step1" />,
    <Recipients key="step2" />,
    <Review key="step3" />,
  ][step];

  return (
    <FormProvider {...methods}>
      <form
        /*  onSubmit={methods.handleSubmit(onSubmit)} */
        className="bg-gray-100 p-4 border border-black  w-full shadow-inner space-y-4 h-full"
      >
        {/* Header */}
        <div className="flex space-x-2 text-sm">
          {steps.map((label, i) => (
            <div
              key={i}
              className={`px-2 py-1 border border-black ${
                i === step ? "bg-blue-200 font-bold" : "bg-white"
              }`}
            >
              {i + 1}. {label}
            </div>
          ))}
        </div>

        <div className="bg-white border border-black p-4 min-h-[150px]">
          {StepComponent}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((prev) => prev - 1)}
            className="border border-black bg-white px-4 py-2 disabled:opacity-50 shadow-[2px_2px_0_#000] text-sm hover:bg-gray-200 font-medium"
          >
            Back
          </button>
          {step === steps.length - 1 ? (
            <button
              type="submit"
              disabled={isTransactionLoading}
              className="border border-black bg-blue-500 px-4 py-2  hover:bg-blue-600shadow-[2px_2px_0_#000] text-sm shadow-[2px_2px_0_#000] font-medium"
            >
              🔒 Lock Now
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="border border-black bg-white px-4 py-2 shadow-[2px_2px_0_#000] text-sm hover:bg-gray-200 font-medium"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
