import { useState } from "react";
import "./App.css";
import BootLoader from "./components/Windows95/BootLoader";
import { BootScreen } from "./components/Windows95/BootScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { Windows95Layout } from "./components/Windows95/Windows95Layout";
import { CivicAuthProvider } from "@civic/auth-web3/react";

function App() {
  const [bootStage, setBootStage] = useState<
    "loader" | "screen" | "login" | "desktop"
  >("loader");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CivicAuthProvider clientId={import.meta.env.VITE_CIVIC_CLIENT_ID!}>
      {bootStage === "loader" && (
        <BootLoader onDone={() => setBootStage("screen")} />
      )}
      {bootStage === "screen" && (
        <BootScreen onDone={() => setBootStage("login")} />
      )}
      {bootStage === "login" && (
        <LoginScreen
          onLogin={() => {
            setLoggedIn(true);
            setBootStage("desktop");
          }}
        />
      )}
      {bootStage === "desktop" && loggedIn && <Windows95Layout />}
    </CivicAuthProvider>
  );
}

export default App;
