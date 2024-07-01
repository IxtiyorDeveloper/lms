import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUIStore } from "./ui.t";
import { IStore } from "store";
import { TParams } from "types";

const initialState: IUIStore = {
  loader: false,
  spinning: false,
  noteModal: false,
  lifecycle: {
    open: false,
    id: null,
  },
  returnModal: false,
  continueModal: false,
  dialPad: false,
  fontSizes: {
    f8: "8px",
    f9: "9px",
    f10: "10px",
    f11: "11px",
    f12: "12px",
    f14: "14px",
    f16: "16px",
    f18: "18px",
    f20: "20px",
    f24: "24px",
  },
  sip: {
    isMinimized: false,
  },
  isWindowActive: true,
  isActiveSip: true,
  volume: 70,
  ipAddr: undefined,
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoaderUI: (store: IUIStore, { payload }: PayloadAction<boolean>) => {
      store.loader = payload;
    },
    toggleDialPad: (store: IUIStore, { payload }: PayloadAction<boolean>) => {
      store.dialPad = payload;
    },
    setWindowIsActive: (
      store: IUIStore,
      { payload }: PayloadAction<boolean>
    ) => {
      store.isWindowActive = payload;
    },
    setVolume: (store: IUIStore, { payload }: PayloadAction<number>) => {
      store.volume = payload;
    },
    setIsActiveSip: (store: IUIStore, { payload }: PayloadAction<boolean>) => {
      store.isActiveSip = payload;
    },
    setSipIPAddress: (
      store: IUIStore,
      { payload }: PayloadAction<string | undefined>
    ) => {
      store.ipAddr = payload;
    },
    toggleLifecycleModal: (
      store: IUIStore,
      { payload }: PayloadAction<{ open: boolean; id: number }>
    ) => {
      store.lifecycle = payload;
    },
    setFontSizes: (
      store: IUIStore,
      { payload }: PayloadAction<TParams>
    ): void => {
      store.fontSizes = payload;
    },
    changeSipUi: (
      store: IUIStore,
      { payload }: PayloadAction<TParams>
    ): void => {
      store.sip = {
        ...store.sip,
        ...payload,
      };
    },
  },
});

export const {
  toggleLoaderUI,
  toggleLifecycleModal,
  setFontSizes,
  toggleDialPad,
  changeSipUi,
  setWindowIsActive,
  setVolume,
  setSipIPAddress,
  setIsActiveSip,
} = slice.actions;

export default slice.reducer;

// Selectors
export const getMainLoader = createSelector(
  (store: IStore) => store.ui,
  (uiStore) => uiStore.loader
);
