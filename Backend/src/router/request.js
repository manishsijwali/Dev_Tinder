const express = require("express");
const adminAuth = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", adminAuth, async (req, res) => {
  const user = req.user;
  console.log("sending a connection request");
  res.send(user.firstName + "sent the connection request");
});

module.exports = requestRouter;
