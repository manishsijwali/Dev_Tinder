import { instance } from "../main";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const profileview = createAsyncThunk(
  "profileview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/profile/view");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ProfileSlice = createSlice({
  name: "profileview",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(profileview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ProfileSlice.reducer;
