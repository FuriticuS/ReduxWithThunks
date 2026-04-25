import { configureStore } from "@reduxjs/toolkit";
import { userDetailsReducer } from "./features/userDetails/userDetailsSlice";

export const store = configureStore({
  reducer: {
    selectedUser: userDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
