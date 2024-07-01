export const STATUS_ACTIVE = 100;
export const STATUS_ARCHIVED = 200;
export const STATE_OPENING = 100;
export const STATE_OPENED = 200;
export const STATE_RUNNING = 300;
export const STATE_CLOSING = 400;
export const STATE_CLOSED = 500;

export const groupStatus = {
  [STATE_OPENING]: "OPENING",
  [STATE_OPENED]: "OPENED",
  [STATE_RUNNING]: "RUNNING",
  [STATE_CLOSING]: "CLOSING",
  [STATE_CLOSED]: "CLOSED",
  // [STATUS_ARCHIVED]: "CLOSED",
};

export const groupStatusWithState = {
  [STATE_OPENING]: "Opening",
  [STATE_OPENED]: "Opened",
  [STATE_RUNNING]: "Running",
  [STATE_CLOSING]: "Closing",
  [STATE_CLOSED]: "Closed",
};

export const groupStatusWithArchive = {
  [STATUS_ARCHIVED]: "Archived",
};

export type TGroupState = 100 | 200 | 300 | 400 | 500;

export enum EGroupTabs {
  Opening = 100,
  Opened = 200,
  Running = 300,
  Closing = 400,
  Closed = 500,
  Archived = 600,
}
