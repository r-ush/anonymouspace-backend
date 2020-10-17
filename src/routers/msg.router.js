const express = require("express");
const router = new express.Router();

const { sendMessage }=require('../controllers/msg.controller');

router.get("/test", (req, res) => {
  res.json({ message: true });
});

router.post("/sendmessage",sendMessage);

module.exports = router;
