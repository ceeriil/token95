import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { Configuration, Recipients, Review } from "./steps";
import { useWallet } from "@solana/wallet-adapter-react";
import { getBN } from "@streamflow/stream";
import { getCurrentTimestampInSeconds } from "@/helpers";
import { createStream } from "@/services/streamflow";
import { Keypair } from "@solana/web3.js";

const steps = ["Configuration", "Recipients", "Review"];

const DELAY_IN_SECONDS = 60;

export const VaultStepper = () => {
  const [step, setStep] = useState(0);
  const wallet = useWallet();
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(false);

  const methods = useForm();

  const onSubmit = async () => {
    /* Onsubmit we check if wallet is connected ✅ */
    if (!wallet.connected) {
      try {
        await wallet.connect();
      } catch (error) {
        console.error("Wallet connection failed:", error);
        return;
      }
    }

    /* For this part we get user input from form and parse it with ou helper functions to prepare fo stremflow lock. this won't work now and assertion will likely fail cause we first need to validate user input with zod and ensure our helper functions parse values correctly */
    const isValid = await methods.trigger();
    if (isValid) {
      setIsTransactionLoading(true);
      const { token, recipient, tokenAmount, unlockDate } = methods.getValues();

      const totalAmountInLamports = getBN(tokenAmount, 6);
      /*  const unlockDurationInSeconds = convertDurationToSeconds(unlockDate); */

      /* This need correction. wanted to get rid of eslint error temporarily. check unlock date const 🚦 */
      const createStreamParams = {
        recipient,
        tokenId: token,
        start: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
        amount: totalAmountInLamports,
        period: unlockDate,
        cliff: getCurrentTimestampInSeconds() + unlockDate,
        cliffAmount: totalAmountInLamports,
        amountPerPeriod: totalAmountInLamports,
        name: "TOKEN98 - TOKEN LOCK",
        canTopup: false,
        cancelableBySender: false,
        cancelableByRecipient: false,
        transferableBySender: false,
        transferableByRecipient: false,
        automaticWithdrawal: false,
        withdrawalFrequency: 0,
        partner: undefined,
      };

      try {
        await createStream(
          createStreamParams,
          {
            sender: wallet as unknown as Keypair,
            isNative: false,
          },
          (stream) => {
            console.log(`${stream.txId} created successfully.`, "success");
          },
          (error) => {
            console.log(`${error}`, "error");
          }
        );
      } catch (err) {
        console.error("Create Lock failed:", err);
        console.log("Something went wrong", "error");
      } finally {
        setIsTransactionLoading(false);
      }
    }
  };

  const StepComponent = [
    <Configuration key="step1" />,
    <Recipients key="step2" />,
    <Review key="step3" />,
  ][step];

  /* TODO: modularize this long ass component */
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === steps.length - 1) {
            onSubmit();
          } else {
            setStep((prev) => prev + 1);
          }
        }}
        className="bg-gray-100 p-4 border border-black w-full shadow-inner space-y-4 h-full"
      >
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
          <button
            type="submit"
            disabled={isTransactionLoading}
            className={`border border-black ${
              step === steps.length - 1
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-white hover:bg-gray-200"
            } px-4 py-2 shadow-[2px_2px_0_#000] text-sm font-medium`}
          >
            {step === steps.length - 1 ? "🔒 Lock Now" : "Next"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
