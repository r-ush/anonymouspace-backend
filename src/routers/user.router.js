const express = require("express");
const router = new express.Router();

const { sendAllData,userAccount,sendUser }=require('../controllers/user.controller');

router.get("/test", (req, res) => {
  res.json({ message: true });
});

//testing
router.get("/alldata",sendAllData);
router.post("/useraccount",userAccount);
router.post("/getuser",sendUser);

module.exports = router;
