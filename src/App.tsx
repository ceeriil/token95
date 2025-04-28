import { useState } from "react";
import "./App.css";
import "@radix-ui/themes/styles.css";

import BootLoader from "./components/Windows95/BootLoader";
import { BootScreen } from "./components/Windows95/BootScreen";
import { Windows95Layout } from "./components/Windows95/Windows95Layout";
import { AppProvider } from "./providers/AppProvider";

function App() {
  const [bootStage, setBootStage] = useState<"loader" | "screen" | "desktop">(
    "loader"
  );

  return (
    <AppProvider>
      {bootStage === "loader" && (
        <BootLoader onDone={() => setBootStage("screen")} />
      )}
      {bootStage === "screen" && (
        <BootScreen onDone={() => setBootStage("desktop")} />
      )}

      {bootStage === "desktop" && <Windows95Layout />}
    </AppProvider>
  );
}

export default App;
