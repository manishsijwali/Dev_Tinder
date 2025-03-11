import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const accepted = () => toast.success("Request Accepted!");
  const rejected = () => toast.error("Request Rejected!");
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dev Tinder</a>
      </div>
      <div className="flex-none ">
        <div className="dropdown dropdown-end mr-6">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
              </svg>

              <span className=" indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-6 w-96 p-4 shadow h-96 overflow-y-auto"
          >
            <div className="flex items-center justify-between my-4 ">
              <img
                src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg"
                className="w-30 h-20 rounded-lg"
                alt=""
              />
              <div className="">
                <h2 className="">Name : Manish</h2>
                <p className="text-sm">Skills : HTML5 , CSS3, JavaScript</p>
                <div className="flex items-center justify-around mt-2">
                  <button className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500" onClick={rejected}>
                    Rejected
                  </button>
                  <button className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500" onClick={accepted}>
                    Accepted
                  </button>
                </div>
              </div>
            </div>
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
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
       {/* ToastContainer should be placed outside the button */}
       <ToastContainer position="top-center" theme="dark" autoClose={1000}/>
    </div>
  );
};

export default Navbar;
