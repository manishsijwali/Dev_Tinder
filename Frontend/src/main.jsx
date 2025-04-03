import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./Store/Store.js";
import { Provider } from "react-redux";
import axios from "axios";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

export const instance = axios.create({
  baseURL: "http://localhost:7777", 
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

