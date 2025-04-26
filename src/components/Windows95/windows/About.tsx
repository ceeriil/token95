export const About = () => {
  return (
    <div className="flex bg-gray-100  p-6 gap-4">
      <div className="flex-1 border-2 border-black p-4 bg-white shadow-[2px_2px_0_#000] text-sm leading-relaxed custom-scroll h-60 overflow-y-scroll">
        <h1 className="text-lg font-bold mb-2">Welcome to Token98</h1>
        <p>
          Token98 is your your all-in-one Solana-powered retro workstation. This
          isn't your typical crypto dashboard — it's a full-on throwback to
          Windows 98, complete with draggable windows, clacky buttons, and
          utility apps for all your DeFi needs.
        </p>
        <p className="mt-2">
          What you can do inside Token98:
          <br /> - 🔁 Swap tokens like you're sending a fax
          <br /> - 💸 Transfer SOL with just a few clicks <br /> - 🔒 Lock,
          vest, and stream your tokens (courtesy of Streamflow) - <br /> 📈 Peek
          at price feeds like a 90s stockbroker
        </p>
        <p className="mt-2">
          Token98 brings serious tools in a not-so-serious wrapper. Because
          saving, streaming, and swapping crypto should be as fun as opening MS
          Paint in ‘98.
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-start">
        <button className="bg-blue-500 text-white border border-black shadow-[2px_2px_0_#000] hover:bg-blue-600 text-sm px-2 py-1.5">
          Continue
        </button>
        <button className="bg-gray-300 text-black border border-black shadow-[2px_2px_0_#000] hover:bg-gray-400 text-sm px-2 py-1.5">
          Learn More
        </button>
      </div>
    </div>
  );
};
