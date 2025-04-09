import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logoutuser } from "../Slice/UserSlice";
import { profileview } from "../Slice/ProfileSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    dispatch(profileview()); // Dispatch profile fetch when component mounts
  }, [dispatch]);

  const { data } = useSelector((state) => state.profileview);
  const { error } = useSelector((state) => state.user);
  const accepted = () => toast.success("Request Accepted!");
  const rejected = () => toast.error("Request Rejected!");

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await dispatch(logoutuser());
    localStorage.clear();
    console.log("Logout Result:", result);

    if (logoutuser.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error("Logout Error:", error); // Fix error handling
    }
  };

  return (
    <div className="navbar shadow-sm">
      <div className="flex-1">
        <Link to={""} className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      <div className="flex-none ">
        <div className="dropdown dropdown-end mr-6">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost rounded-2xl pr-2 pt-2 btn-square"
          >
            {/* <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
              </svg>

              <span className="indicator-item">100</span>
            </div> */}
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile Avatar"
                src={
                  data?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/Profile"} className="justify-between">
                Profile <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <button onClick={handleClick}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      {/* ToastContainer should be placed outside the button */}
      <ToastContainer position="top-center" theme="dark" autoClose={1000} />
    </div>
  );
};

export default Navbar;
