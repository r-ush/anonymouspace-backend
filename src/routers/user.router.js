const express = require("express");
const router = new express.Router();

const { sendAllData }=require('../controllers/user.controller');

router.get("/test", (req, res) => {
  res.json({ message: true });
});

//testing
router.get("/alldata",sendAllData);

module.exports = router;
