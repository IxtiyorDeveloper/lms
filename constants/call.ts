export const CALL_QUERY_NAME = "callNumber";

export enum EnumCallStatus {
  CALL_MISSED = 100,
  CALL_END = 200,
  CALL_WAITING = 300,
  CALL_PROCESSED = 400,
  CALL_PAUSED = 500,
  CALL_START = 600,
}

export enum EnumCallDirection {
  DIRECTION_OUTBOUND = 100,
  DIRECTION_INBOUND = 200,
  DIRECTION_LOCAL = 300,
}
