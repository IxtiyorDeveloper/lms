import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSalary } from "./type";
import { IStore } from "../../index";

const initialState: TSalary = {
  data: undefined,
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    setLeads: (store: TSalary, { payload }: PayloadAction<any>) => {
      store.data = payload;
    },
  },
});

export const { setLeads } = slice.actions;
export default slice.reducer;
