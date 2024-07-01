import { ISupportTimeTable } from "types";

export interface Type {
  data: ISupportTimeTable | undefined;
}

export enum ButtonType {
  ACCEPTED = "accepted",
  WAITING = "waiting",
  DISABLED = "disabled",
}
