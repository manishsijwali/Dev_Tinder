import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileview } from "../Slice/ProfileSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, error } = useSelector((state) => state.profileview);

  useEffect(() => {
    dispatch(profileview());
  }, [dispatch]);

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleUpdatePassword = () => {
    navigate("/updatepassword");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Error: {error.message || JSON.stringify(error)}
        </p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            {/* Left Side - User Profile Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {data.firstName} {data.lastName}
              </h2>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold text-gray-700">Skills:</span>{" "}
                {data?.skills?.length > 0 ? (
                  <span className="text-blue-500">
                    {data.skills.join(", ")}
                  </span>
                ) : (
                  <span className="text-red-500">No skills available</span>
                )}
              </p>
              <p className="text-gray-600 mt-2">
                {data.about || "No bio available."}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleEditProfile}
                  className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleUpdatePassword}
                  className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Right Side - Profile Photo */}
            <div className="flex justify-center">
              <img
                src={data.photoUrl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-44 h-44 md:w-48 md:h-48 rounded-full border-4 border-gray-300 shadow-md"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
