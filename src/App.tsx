import { useState } from "react";
import "./App.css";
import BootLoader from "./components/Windows95/BootLoader";
import { BootScreen } from "./components/Windows95/BootScreen";
import { LoginScreen } from "./components/screens/LoginScreen";

function App() {
  const [bootStage, setBootStage] = useState<"loader" | "screen" | "login">(
    "loader"
  );

  return (
    <>
      {bootStage === "loader" && (
        <BootLoader onDone={() => setBootStage("screen")} />
      )}
      {bootStage === "screen" && (
        <BootScreen onDone={() => setBootStage("login")} />
      )}
      {bootStage === "login" && <LoginScreen />}
    </>
  );
}

export default App;
