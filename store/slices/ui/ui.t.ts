import { TParams } from "types";
export interface IUIStore {
  loader: boolean;
  spinning: boolean;
  noteModal: boolean;
  lifecycle: {
    open: boolean;
    id: number | null;
  };
  returnModal: boolean;
  continueModal: boolean;
  fontSizes: TParams;
  dialPad: boolean;
  sip: {
    isMinimized: boolean;
  };
  isWindowActive: boolean;
  isActiveSip: boolean;
  volume: number;
  ipAddr?: string;
}
