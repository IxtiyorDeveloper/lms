import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSalary } from "./type";
import { IStore } from "../../index";

const initialState: TSalary = {
  data: undefined,
  temp: undefined,
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    setSalary: (store: TSalary, { payload }: PayloadAction<any>) => {
      store.temp = store.data;
      store.data = payload;
    },
  },
});

export const { setSalary } = slice.actions;
export const getSalary = createSelector(
  (store: IStore) => store.salary,
  (uiStore) => uiStore.data
);
export default slice.reducer;
