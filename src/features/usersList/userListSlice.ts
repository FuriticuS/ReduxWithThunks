import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FetchErrorPayload, User } from "../../types/user";

export interface UserListState {
  users: User[];
  loading: boolean;
  error: FetchErrorPayload | null;
}

const initialState: UserListState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: FetchErrorPayload }
>("userList/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response: Response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    if (!response.ok) {
      return rejectWithValue({
        status: response.status,
        message: "Failed to fetch users.",
      });
    }
    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      return rejectWithValue({
        status: response.status,
        message: "Invalid response shape.",
      });
    }
    return data as User[];
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : "Unknown error occurred";
    return rejectWithValue({ status: 0, message });
  }
});

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user: User) => user.id !== action.payload);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserListState>) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        const fallback: FetchErrorPayload = {
          status: 0,
          message: "Failed to load users.",
        };
        state.error = action.payload ?? fallback;
      });
  },
});

export const userListReducer = userListSlice.reducer;

export const { addUser, deleteUser } = userListSlice.actions;
