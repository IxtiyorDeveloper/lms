import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISipStore } from "./type";
import { IProps } from "globals/components/callModal/components/userCard";

const initialState: ISipStore = {
  sip: {
    sipStatus: "sipStatus/CONNECTING",
    sipErrorType: "sipErrorType/CONFIGURATION",
    sipErrorMessage: "",
    rtcSession: {},
    callStatus: "callStatus/IDLE",
    callDirection: null,
    callCounterpart: "",
    ref: {},
    startCall: () => ({}),
    sessions: [],
  },
  isMuted: false,
  measurement: {
    width: 300,
    height: 900,
  },
  users: [],
  connectionConfig: null,
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "sip",
  initialState,
  reducers: {
    setSip: (store: ISipStore, { payload }: PayloadAction<any>) => {
      store.sip = { ...store.sip, ...payload };
    },
    setSipMuted: (store: ISipStore, { payload }: PayloadAction<boolean>) => {
      store.isMuted = payload;
    },
    changeCallModalSize: (
      store: ISipStore,
      { payload }: PayloadAction<{ width?: number; height?: number }>
    ) => {
      store.measurement = {
        ...store.measurement,
        ...payload,
      };
    },
    changeCallUsers: (
      store: ISipStore,
      { payload }: PayloadAction<IProps["user"]>
    ) => {
      store.users = payload as any;
    },
    changeCallServer: (
      store: ISipStore,
      { payload }: PayloadAction<ISipStore["connectionConfig"]>
    ) => {
      store.connectionConfig = payload as any;
    },
  },
});

export const {
  setSip,
  changeCallModalSize,
  changeCallServer,
  changeCallUsers,
  setSipMuted,
} = slice.actions;
export default slice.reducer;
