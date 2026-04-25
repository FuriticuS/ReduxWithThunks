import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserDetailsState {
  selectedUserId: number | null;
}

const initialState: UserDetailsState = {
  selectedUserId: null,
};

const userDetailsSlice = createSlice({
  name: "userDetailsSlice",
  initialState,
  reducers: {
    selectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
    },
  },
});

export const userDetailsReducer = userDetailsSlice.reducer;

export const { selectedUser, clearSelectedUser } = userDetailsSlice.actions;
