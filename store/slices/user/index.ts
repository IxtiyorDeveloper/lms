import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./type";

const initialState: TUser = {
  user: null,
  isLoading: true,
  logOut: false,
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (store: TUser, { payload }: PayloadAction<any>) => {
      store.user = payload;
    },
    setIsLoadingUser: (store: TUser, { payload }: PayloadAction<boolean>) => {
      store.isLoading = payload;
    },
    setLogOut: (store: TUser, { payload }: PayloadAction<boolean>) => {
      store.logOut = payload;
    },
  },
});

export const { setUser, setIsLoadingUser, setLogOut } = slice.actions;

export default slice.reducer;
