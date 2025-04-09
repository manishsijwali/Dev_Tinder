import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/UserSlice";
import ProfileReducer from "../Slice/ProfileSlice";
import EditProfileReducer from "../Slice/EditProfileSlice";
import UpdatePasswordSlice from "../Slice/UpdatePasswordSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profileview: ProfileReducer,
    editprofile: EditProfileReducer,
    updatepassword: UpdatePasswordSlice,
  },
});
