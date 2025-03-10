const express = require("express");
const adminAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const user = require("../model/user");

const requestRouter = express.Router();

// Send Connection Request
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
        return res
          .status(400)
          .json({ message: "You cannot send a request to yourself." });
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

      await data.save();

      res.json({
        message: `${req.user.firstName} your request has been sent successfully to ${toUser.firstName}.`,
      });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

// Review Connection Request
requestRouter.post(
  "/request/review/:status/:requestId", 
  adminAuth,
  async (req, res) => {
    try {
      const LoggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["rejected", "accepted"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: LoggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(400).json({ message: "No connection request found." });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();  

      res.json({ message: "Connection request " + status, data });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;
