import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Hero = () => {
  const accepted = () => toast.success("Request Interested!");
  const rejected = () => toast.error("Request Ignored!");
  return (
    <div className="hero   min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm lg:w-[300px] rounded-4xl shadow-2xl"
        />
        <div className="lg:w-[500px]">
          <h1 className="text-4xl text-neutral font-bold">
            Hello Developers, {25}
          </h1>
          <h1 className="text-xl py-4 text-neutral font-bold">
            Skills : HTML5, CSS3, JavaScript
          </h1>
          <p className="py-3 text-neutral lg:w-1/2">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className=" mt-4 lg:w-1/2 flex  items-center justify-around">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={rejected}
            >
              Ignored
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={accepted}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
      {/* ToastContainer should be placed outside the button */}
      <ToastContainer position="top-center" theme="dark" autoClose={500} />
    </div>
  );
};

export default Hero;
