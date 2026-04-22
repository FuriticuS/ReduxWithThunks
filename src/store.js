import {configureStore} from "@reduxjs/toolkit";
import userListSlice from "./features/usersList/userListSlice.js";
import userDetailsSlice from "./features/userDetails/userDetailsSlice.js";

export const store = configureStore({
  reducer: {
    userList: userListSlice,
    selectedUser: userDetailsSlice
  }
});