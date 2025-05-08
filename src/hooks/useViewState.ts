// hooks/useViewStore.ts
import { create } from "zustand";
import { GameBundle } from "gamba-react-ui-v2";

type ViewState = {
  view: "dashboard" | "game";
  selectedGame: GameBundle | null;
  setView: (view: ViewState["view"]) => void;
  setGame: (game: GameBundle | null) => void;
};

export const useViewStore = create<ViewState>((set) => ({
  view: "dashboard",
  selectedGame: null,
  setView: (view) => set({ view }),
  setGame: (game) =>
    set({
      selectedGame: game,
      view: game ? "game" : "dashboard",
    }),
}));
