import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { GambaUi } from "gamba-react-ui-v2";
import { useTransactionError } from "gamba-react-v2";
import React from "react";
import { Modal } from "./components/Modal";
import { TOS_HTML, ENABLE_TROLLBOX } from "./constants";
import { useToast } from "@/hooks/useToast";
import { useUserStore } from "@/hooks/useUserStore";
import Dashboard from "./Dashboard/Dashboard";
import Game from "./Game/Game";
import Header from "./Header";
import { MainWrapper, TosInner, TosWrapper } from "./styles";
import TrollBox from "./components/TrollBox";
import Toasts from "./Toasts";
import { useViewStore } from "@/hooks/useViewState";

function ErrorHandler() {
  const walletModal = useWalletModal();
  const toast = useToast();
  const [error, setError] = React.useState<Error>();

  useTransactionError((error) => {
    if (error.message === "NOT_CONNECTED") {
      walletModal.setVisible(true);
      return;
    }
    toast({
      title: "❌ Transaction error",
      description: error.error?.errorMessage ?? error.message,
    });
  });

  return (
    <>
      {error && (
        <Modal onClose={() => setError(undefined)}>
          <h1>Error occured</h1>
          <p>{error.message}</p>
        </Modal>
      )}
    </>
  );
}

export default function Games() {
  const newcomer = useUserStore((state) => state.newcomer);
  const set = useUserStore((state) => state.set);
  const view = useViewStore((state) => state.view);

  return (
    <div className="min-w-[700px] game-bg ">
      {newcomer && (
        <Modal>
          <h1>Welcome</h1>
          <TosWrapper>
            <TosInner dangerouslySetInnerHTML={{ __html: TOS_HTML }} />
          </TosWrapper>
          <p>By playing on our platform, you confirm your compliance.</p>
          <GambaUi.Button main onClick={() => set({ newcomer: false })}>
            Acknowledge
          </GambaUi.Button>
        </Modal>
      )}
      <ErrorHandler />
      <Header />
      <Toasts />
      <MainWrapper>
        {view === "dashboard" ? <Dashboard /> : <Game />}
      </MainWrapper>
      {ENABLE_TROLLBOX && <TrollBox />}
    </div>
  );
}
