import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISidebarStore, sidebarMenu } from "./sidebar.t";

const initialState: ISidebarStore = {
  isOpen: { id: 0, isOpen: false },
};

/**
 * Actions and Reducers
 */
const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (
      store: ISidebarStore,
      { payload }: PayloadAction<sidebarMenu>
    ) => {
      store.isOpen = payload;
    },
  },
});

export const { toggleSidebar } = slice.actions;

export default slice.reducer;

// Selectors
