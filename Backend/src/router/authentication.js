require("dotenv").config();
const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationSignUpData } = require("../utils/validation");

const authRouter = express.Router();

//for signup
authRouter.post("/signup", async (req, res) => {
  //validation of data

  try {
    validationSignUpData(req);

    //Encrypt the password

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("user data saved successfully");
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

//for login

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      return res.send("Login Succcessfully");
    } else {
      res.status(400).send("invalid password");
    }
  } catch {
    res.status(400).send("ERROR");
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfully");
});
module.exports = authRouter;
