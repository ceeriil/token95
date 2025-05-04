import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "👋 Welcome to Token98",
    content: `Token98 is your retro-futuristic, pixel-powered portal to all things Solana — but without the boring dashboards and "clean UI" everyone keeps copy-pasting.
Wanna learn what each mini app does before clicking wildly?
Click “Next” and let’s take a tour — retro style.`,
  },
  {
    title: "🧩 The Desktop",
    content: `Token98 is like a virtual desktop.
Every icon you see is a mini app (aka a “window”).
They all do different stuff — click around, explore, break nothing (we hope).

If you're confused? Don’t worry — we knew you'd get lost at some point.
That’s why we added help files in most windows and a master Help icon on the top bar. Use it. We don’t judge..

✅ Pro tip: You can move windows around.
🔁 You can also switch between Mainnet and Testnet in the corner.`,
  },
  {
    title: "🔐 Logging In (It’s Not That Deep)",
    content: `Some mini-apps need you to log in. We give you two options:

🦊 Use your own wallet (Solflare, Phantom, etc)
🧙 Civic Auth (login with Gmail or GitHub and we’ll generate a wallet for you)

✨ Both options let you use Mainnet and Testnet.
💡 If you log in via Civic, you get a wallet with backup and zero stress.`,
  },
  {
    title: "💾 Available Mini Apps (More Coming Soon™)",
    content: ` 💸 Bank: Send SOL to other wallets. Fast and basic.
    🔒 Lock: Lock your tokens. For saving, self-discipline, or just to say “I’ll come back for you later.”
    🧪 Risk Scanner: Check if a wallet or token is sketchy before you get rugged.
    📈 Birdeye (Embedded): Analyze token performance. Zoom, stare, cry, repeat.
    📒 Address Book: Save wallet addresses you use often. Stop copying from Notion.
    👤 Profile: View your wallet, balances, and a cool pixel avatar
    🧠 Guide: That’s literally this page.
    ℹ️ About: You’ll see.
    🎨 Theme: Not functional yet, but we like teasing you.`,
  },
  {
    title: "📦 Testnet vs Mainnet (aka Fake vs Real Money)",
    content: `Testnet = monopoly money. You can test features, send fake SOL, and vibe.
Mainnet = real life. Real tokens, real risk, real rewards.

🧪 You can request free test tokens once per day from the bottom-right corner.
📛 Don’t say we didn’t warn you about Mainnet.`,
  },
  {
    title: "🛠 Reporting Bugs / Suggesting Features",
    content: `This is a beta release. That means:
- Some stuff might break.
- You’re allowed to roast us.
- We’ll actually fix things fast.

🐛 Found a bug? Suggestion? Meme idea?
There’s a button for that on the start menu— or DM us.
Token98 is open source. Pull requests are welcome.`,
  },
  {
    title: "🎉 You’re All Set!",
    content: `You’re now ready to navigate Token98 like a retro Solana hacker.
You can always return to this guide anytime. Just click the Guide icon.

⚡ Now go touch some tokens, explore, break things (nicely), and vibe.`,
  },
];

export const UserManual = () => {
  const [step, setStep] = useState(0);

  return (
    <Card className=" mx-auto rounded-none animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle>{steps[step].title}</CardTitle>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap text-sm">
        {steps[step].content}
        <div className="flex justify-between mt-6">
          <Button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="bg-gray-300 text-black border border-black shadow-[2px_2px_0_#000] hover:bg-gray-400 text-sm px-2 py-1.5"
          >
            Back
          </Button>
          {step === steps.length - 1 ? (
            <Button
              onClick={() => setStep(0)}
              className="bg-gray-300 text-black border border-black shadow-[2px_2px_0_#000] hover:bg-gray-400 text-sm px-2 py-1.5"
            >
              Restart
            </Button>
          ) : (
            <Button
              className="bg-gray-300 text-black border border-black shadow-[2px_2px_0_#000] hover:bg-gray-400 text-sm px-2 py-1.5"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
