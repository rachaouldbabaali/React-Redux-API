import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  // eslint-disable-next-line consistent-return
  async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=5');
      const data = await response.json();
      return data.results;
    } catch (error) {
      Promise.reject(error.message);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: undefined,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export default usersSlice;
