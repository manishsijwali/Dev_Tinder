import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../main";

export const signupuser = createAsyncThunk(
  "user/signupuser",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginuser = createAsyncThunk(
  "user/loginuser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/login", { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(signupuser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signupuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(signupuser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(loginuser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(loginuser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
