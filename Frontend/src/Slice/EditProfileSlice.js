import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../main";

export const EditProfile = createAsyncThunk(
  "editprofile",
  async ({ formData }, { rejectWithValue }) => {
    // console.log(formData);

    try {
      const response = await instance.patch("/profile/edit", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const EditProfileSlice = createSlice({
  name: "editprofile",
  initialState: {
    isLoading: false,
    data: null,
    error: null,
    message: false,
  },

  extraReducers: (builder) => {
    builder.addCase(EditProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(EditProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.message = action.payload;
      state.error = null;
    });
    builder.addCase(EditProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default EditProfileSlice.reducer;
