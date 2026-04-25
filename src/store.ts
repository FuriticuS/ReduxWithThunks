import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "./features/usersList/userListSlice";
import userDetailsReducer from "./features/userDetails/userDetailsSlice";

export const store = configureStore({
  reducer: {
    userList: userListReducer,
    selectedUser: userDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
