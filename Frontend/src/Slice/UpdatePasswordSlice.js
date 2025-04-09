import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../main";

// Updated the async thunk to include the password in the request
export const UpdatePassword = createAsyncThunk(
  "updatepassword",
  async ({ password }, { rejectWithValue }) => {
    try {
      // Send password in the request body
      const response = await instance.patch("/profile/updatepassword", { password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const UpdatePasswordSlice = createSlice({
  name: "updatepassword",
  initialState: {
    isLoading: false,
    data: null,
    message: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(UpdatePassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.message = action.payload.message || "Password updated successfully";
      state.error = null;
    });
    builder.addCase(UpdatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.message = null;
      state.error = action.payload;
    });
  },
});

export default UpdatePasswordSlice.reducer;
