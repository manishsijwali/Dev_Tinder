const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authentication");
const profileRouter = require("./router/profile");
const { routes } = require("./router/routes");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allows browser to send/receive cookies
  })
);

//for post the req to db
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", routes);
app.use("/", requestRouter);
app.use("/", userRouter);

// connection to db
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });
