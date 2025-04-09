import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Editprofile from "./components/EditProfile/EditProfile";
import ImageUpload from "./components/ImageUpload";
import UpdatePassword from "./components/EditProfile/UpdatePassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children:[
      {
        path:"/",
        element: <Hero/>
      },
      {
        path: "/image",
        element: <ImageUpload />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/editprofile",
        element: <Editprofile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path:"/updatepassword",
        element:<UpdatePassword/>
      }
    ]
  },
 
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;



