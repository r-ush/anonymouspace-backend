const express = require("express");
const router = new express.Router();

const { sendMessage }=require('../controllers/msg.controller');

router.post("/sendmessage",sendMessage);

module.exports = router;
