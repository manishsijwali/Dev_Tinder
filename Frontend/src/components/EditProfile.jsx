import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    photoUrl: "",
    skills: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile submitted:", profile);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      {/* Edit Profile Form */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md text-black focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border  text-black  border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full mt-1 p-3 border  text-black  border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full mt-1 p-3 border  text-black  border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border  text-black  border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photoUrl"
              value={profile.photoUrl}
              onChange={handleChange}
              className="w-full mt-1 p-3 border  text-black  border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              className="w-full mt-1 p-3 border  text-black  border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 p-3 border text-black border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Login Form */}
      {/* <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <fieldset className="border border-gray-300 p-6 rounded-md">
          <legend className="text-lg font-semibold px-2 text-gray-700">
            Login
          </legend>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              />
            </div>

            <button className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 transition duration-300">
              Login
            </button>
          </div>
        </fieldset>
      </div> */}
    </div>
  );
};

export default Profile;
