import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Hero />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path:"/signup",
    element:(
      <>
      <SignUp/>
      </>
    )

  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
