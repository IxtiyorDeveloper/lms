import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConfig, IUser } from "./type";

const initialState: IConfig = {
  user: {
    port: 8888,
    ip: undefined,
    branch: 1,
  },
  isConnected: false,
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "check",
  initialState,
  reducers: {
    setCheckUser: (store: IConfig, { payload }: PayloadAction<IUser>) => {
      store.user = payload;
    },
    setTaxModalState: (store: IConfig, { payload }: PayloadAction<boolean>) => {
      store.isConnected = payload;
    },
    // toggleDialPad: (store: IUser, { payload }: PayloadAction<boolean>) => {
    //   store.dialPad = payload;
    // },
  },
});

export const { setCheckUser, setTaxModalState } = slice.actions;

export default slice.reducer;
