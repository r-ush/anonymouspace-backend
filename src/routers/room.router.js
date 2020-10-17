const express = require("express");
const router = new express.Router();
const {
  check,
  createRoom,
  joinRoom,
  leaveUser,
} = require("../controllers/room.controller");

router.post("/createRoom", createRoom);
router.post("/joinRoom", joinRoom);
router.post("/leaveUser", leaveUser);

module.exports = router;
