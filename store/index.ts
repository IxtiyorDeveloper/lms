import { configureStore } from "@reduxjs/toolkit";

import reducer from "./slices";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export * from "./slices";

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type IStore = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<IStore> = useSelector;
