import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk("userList/fetchUsers", async (_, {rejectWithValue}) => {
  try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    if (!response.ok) {
      return rejectWithValue({status: response.status, message: "Failed to fetch users."});
    }
    return response.json()
  } catch (error){
    return rejectWithValue({status: error.status, message: error.message});
  }
})

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
})
export default userListSlice.reducer;

export const {addUser, deleteUser} = userListSlice.actions;