import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: "",
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "key",
  initialState,
  reducers: {},
});

export default slice.reducer;
