const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authentication");
const profileRouter = require("./router/profile");
const { routes } = require("./router/routes");
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//for post the req to db
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", routes);

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
