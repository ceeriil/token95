import { useState } from "react";
import clsx from "clsx";

export const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (password === "hello") {
        onLogin();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setError(false), 1000);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-[#0B0100] flex items-center text-white text-2xl flex-col login-bg bg-no-repeat relative overflow-hidden">
      <h1 className="silver-title">Arcanum</h1>

      <div
        className={clsx(
          "p-2 rounded-xl text-black absolute bottom-[7rem] transition-transform duration-300",
          shake && "animate-shake"
        )}
      >
        <div className="relative h-[300px]">
          <img src="/img/card.png" width={400} />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className={clsx(
              "text-white py-2 px-2 mt-12 absolute border bg-transparent bottom-[8%] left-[18%] w-[64%] outline-none transition-all duration-300",
              error ? "border-red-500 animate-pulse" : "border-black"
            )}
          />
        </div>
      </div>

      <style>{`
     

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }

        .animate-shake {
          animation: shake 0.3s ease;
        }
      `}</style>
    </div>
  );
};
