import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  audio: {
    [key: number]: {
      url: string;
      playing: boolean;
    };
  } | null;
} = {
  audio: null,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
  },
});

export const { setAudio } = audioSlice.actions;

export default audioSlice.reducer;
