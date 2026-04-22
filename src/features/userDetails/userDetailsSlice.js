import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  selectedUserId: null,
}

const userDetailsSlice = createSlice({
  name: "userDetailsSlice",
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
    }
  }
})

export default userDetailsSlice.reducer;

export const {selectedUser, clearSelectedUser} = userDetailsSlice.actions;