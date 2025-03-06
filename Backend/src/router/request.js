const express = require("express");
const adminAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const user = require("../model/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  adminAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Check if the user is trying to send a request to themselves
      if (fromUserId.toString() === toUserId.toString()) {
        return res.status(400).json({ message: "You cannot send a request to yourself." });
      }

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: `Invalid status type: ${status}` });
      }

      const toUser = await user.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User is not present!" });
      }

      // Check if there is an existing connection request
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists!" });
      }

      const data = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      await data.save(); // Ensure data is saved before responding

      res.json({
        message: `${req.user.firstName || req.user.lastName}, your request has been sent successfully.`,
      });
    } catch (error) {
      res.status(500).send("ERROR: " + error.message); // Use status 500 for internal server errors
    }
  }
);

module.exports = requestRouter;
