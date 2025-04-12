import { useState, useEffect } from "react";

export const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [
      { text: "Starting WhaleOS...", duration: 800 },
      { text: "Loading system files...", duration: 400 },
      { text: "Booting kernel modules...", duration: 400 },
      { text: "Initializing device drivers...", duration: 400 },
      { text: "Detecting hardware...", duration: 500 },
      { text: "Connecting to local host...", duration: 300 },
      { text: "Loading user settings...", duration: 400 },
      { text: "Optimizing memory...", duration: 400 },
      { text: "Setting up desktop environment...", duration: 700 },
      { text: "Loading startup programs...", duration: 400 },
      { text: "Applying Whale0S themes...", duration: 500 },
      { text: "Establishing internet connection...", duration: 600 },
      { text: "Checking for updates...", duration: 400 },
      { text: "Verifying system integrity...", duration: 400 },
      { text: "Finalizing boot process...", duration: 300 },
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
      }, 40);
    };

    const runSteps = (currentStep: number) => {
      if (currentStep < steps.length) {
        setStep(currentStep);
        timeout = window.setTimeout(() => {
          runSteps(currentStep + 1);
        }, steps[currentStep].duration);
      } else {
        setTimeout(() => setDone(true), 1000);
      }
    };

    startProgress();
    runSteps(0);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      className="h-screen w-full bg-black flex items-center justify-center"
      onClick={() => done && onDone()}
    >
      <div className="text-black text-center space-y-6 max-w-md w-full px-8 bg-red-300 py-10 border-[#808080] border-4">
        <img
          src="/img/angelhead.png"
          alt="Windows 95"
          className="w-32 mx-auto"
        />

        <p className="text-4xl font-bold">Whale0S v1.0.5</p>

        <div className="w-full h-5 bg-gray-300 border border-black shadow-inner relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full loader-bg transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm font-medium text-black">{stepText(step)}</p>

        {done && (
          <p className="mt-6 text-black font-bold text-sm animate-pulse">
            Press Any key to Open WhaleOs...
          </p>
        )}
      </div>
    </div>
  );
};

const stepText = (index: number) => {
  const messages = [
    "Starting Windows 95...",
    "Loading system files...",
    "Booting kernel modules...",
    "Initializing device drivers...",
    "Detecting hardware...",
    "Connecting to local host...",
    "Loading user settings...",
    "Optimizing memory...",
    "Setting up desktop environment...",
    "Loading startup programs...",
    "Applying Whale0S themes...",
    "Establishing internet connection...",
    "Checking for updates...",
    "Verifying system integrity...",
    "Finalizing boot process...",
  ];

  return messages[index] || "";
};
