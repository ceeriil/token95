export interface Application {
  title: string;
  icon: string;
}

export interface Applications {
  [key: string]: Application;
}

export interface Position {
  x: number;
  y: number;
}

export interface WindowProps {
  volume?: number;
  setVolume?: (volume: number) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
  currentTrack?: number;
  setCurrentTrack?: (track: number) => void;
}
