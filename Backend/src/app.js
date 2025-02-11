const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");
const User = require("./model/user");
const cookieParser = require("cookie-parser");
const adminAuth = require("./middlewares/auth");
const authRouter = require("./router/authentication");
const profileRouter = require("./router/profile");
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//for post the req to db
app.use("/",authRouter)
app.use("/",profileRouter)


//sending the connection request



//for get user data from db
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    res.send(user);
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

//find all users
app.get("/allUsers", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

//for delete a user
app.delete("/deleteuser", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

//for update a user
app.patch("/updateuser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send({ message: "Invalid operation" });
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be moe than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

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
