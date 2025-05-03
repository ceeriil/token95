export interface Application {
  title: string;
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: React.ComponentType<any>;
  guideBook?: React.ComponentType;
  showOnDesktop?: boolean;
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

/* Streamflow type shit */
export type PermissionRole = "Recipient" | "Sender" | "Both" | "Neither";

export type TimeUnit =
  | "Second"
  | "Minute"
  | "Hour"
  | "Day"
  | "Week"
  | "Bi-week"
  | "Month"
  | "Quarter"
  | "Year";

export interface TransferPermissions {
  transferableBySender: boolean;
  transferableByRecipient: boolean;
}

export interface CancelPermissions {
  cancelableBySender: boolean;
  cancelableByRecipient: boolean;
}

export interface ReviewTransaction {
  cancellationRights: PermissionRole;
  mint: string;
  recipient: string;
  tokenAmount: string;
  transferableRights: PermissionRole;
  unlockSchedule: string;
  vestingDuration: number;
  vestingDurationUnit: TimeUnit;
  unlockDate: string;
}
