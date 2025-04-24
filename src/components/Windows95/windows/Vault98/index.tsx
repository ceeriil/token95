import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { Configuration, Recipients, Review } from "./steps";

const steps = ["Configuration", "Recipients", "Review"];

export const VaultStepper = () => {
  const [step, setStep] = useState(0);

  const methods = useForm({
    defaultValues: {
      token: "",
      amount: "",
      duration: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("🚀 Final Submit", data);
  };

  const StepComponent = [
    <Configuration key="step1" />,
    <Recipients key="step2" />,
    <Review key="step3" />,
  ][step];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-gray-100 p-4 border border-black  w-full shadow-inner space-y-4"
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

        {/* Dynamic Step Content */}
        <div className="bg-white border border-black p-4 min-h-[150px]">
          {StepComponent}
        </div>

        {/* Nav */}
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
