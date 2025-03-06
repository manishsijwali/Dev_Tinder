const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const adminAuth = require("../middlewares/auth");
const validationEditData = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error + "ERROR");
  }
});

profileRouter.patch("/profile/edit", adminAuth, (req, res) => {
  try {
    if (!validationEditData) {
      return res.status(400).send("Invalid data");
    }
    const LoggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (LoggedInUser[key] = req.body[key]));
    LoggedInUser.save();
    res.json({
      messsgae: `${LoggedInUser.firstName}, your profile is updated successfully`,
      data: { LoggedInUser },
    });
  } catch (error) {
    res.status(400).send(error + "ERROR");
  }
});

profileRouter.patch("/profile/updatepassword", adminAuth, async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(400).send(error + "ERROR");
  }
});

module.exports = profileRouter;
