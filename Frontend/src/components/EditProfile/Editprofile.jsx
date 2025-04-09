import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../../Slice/EditProfileSlice";

const Editprofile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message, error } = useSelector((state) => state.editprofile);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    skills: "",
    about: "",
    photoUrl: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload image to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("file", file);
    formDataImg.append("upload_preset", "devtinder"); // Your Cloudinary upload preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkif9eopq/image/upload", // Your Cloudinary URL
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const data = await res.json();
      console.log("📦 Cloudinary upload response:", data);

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          photoUrl: data.secure_url,
        }));
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("❌ Image upload error:", err);
      alert("Image upload failed. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
    };

    console.log("🚀 Submitting profile data:", formattedData);

    try {
      const res = await dispatch(EditProfile({formData : formattedData}));
      if (res.meta.requestStatus === "fulfilled") {
        console.log("✅ Profile updated successfully:", res.payload);
        alert(res.payload.message || "Profile updated successfully!");
        console.log(message);
        setFormData({
          firstName: "",
          lastName: "",
          skills: "",
          about: "",
          photoUrl: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Profile update failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium text-gray-700">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium text-gray-700">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {formData.photoUrl && (
          <div className="mt-4 text-center">
            <img
              src={formData.photoUrl}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-full border mx-auto"
            />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {error.message || error}
          </p>
        )}

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editprofile;
