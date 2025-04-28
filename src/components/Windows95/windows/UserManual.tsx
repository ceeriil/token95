export const UserManual = () => {
  return (
    <div className="flex bg-gray-100  p-6 gap-4 h-full">
      <div className="flex-1 border-2 border-black p-4 bg-white shadow-[2px_2px_0_#000] text-sm leading-relaxed custom-scroll h-60 overflow-y-scroll">
        <h1 className="text-lg font-bold mb-2">Your guide to enjoy Token98</h1>
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
    </div>
  );
};
