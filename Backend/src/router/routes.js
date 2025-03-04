const express = require("express");
const User = require("../model/user");

const routes = express.Router();

//get user by email
routes.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    res.send(user);
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

//get all users from db
routes.get("/allUsers", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

//for delete
routes.delete("/deleteuser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    console.log("something went wrong" + error.message);
  }
});

//for update an user
routes.patch("/updateuser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  //   console.log(data);

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
module.exports = { routes };
