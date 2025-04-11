import { useState, useEffect } from "react";

export const BootScreen = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      { text: "Starting Windows 95...", duration: 1000 },
      { text: "Loading system files...", duration: 500 },
      { text: "Initializing device drivers...", duration: 500 },
      { text: "Loading user settings...", duration: 500 },
      { text: "Preparing Windows...", duration: 500 },
    ];

    let timeout: number;
    let progressInterval: number;

    const startProgress = () => {
      let currentProgress = 0;
      progressInterval = window.setInterval(() => {
        currentProgress += 1;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 30);
    };

    const runSteps = (currentStep: number) => {
      if (currentStep < steps.length) {
        setStep(currentStep);
        timeout = window.setTimeout(() => {
          runSteps(currentStep + 1);
        }, steps[currentStep].duration);
      }
    };

    startProgress();
    runSteps(0);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, []);

  const steps = [
    "System Starting...",
    "Loading system files...",
    "Initializing device drivers...",
    "Loading user settings...",
    "Preparing Windows...",
  ];

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-black text-center space-y-8 max-w-md w-full px-8 bg-[#3373C4] py-12 border-[#808080] border-4">
        <div className="space-y-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Windows_95_stacked_logo.svg"
            alt="Windows 95"
            className="w-32 mx-auto"
          />
        </div>

        <p className="text-4xl font-bold">Whale0S v1.0.5</p>

        <div className="w-full h-5 bg-gray-300 border border-black shadow-inner relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 animate-loader-bar"
            style={{ width: "50%" }}
          />
        </div>

        <p className="text-sm font-medium">{steps[step]}</p>
      </div>

      <style>{`
          @keyframes progressStripe {
            from { transform: translateX(-100%); }
            to { transform: translateX(500%); }
          }
        `}</style>
    </div>
  );
};
