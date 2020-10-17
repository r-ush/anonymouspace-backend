const express = require("express");
const router = new express.Router();

const { sendAllData,userAccount,sendUser,updateScreenTime }=require('../controllers/user.controller');

router.get("/test", (req, res) => {
  res.json({ message: true });
});

//testing
router.get("/alldata",sendAllData);
router.post("/useraccount",userAccount);
router.post("/getuser",sendUser);
router.post("/updatescreentime",updateScreenTime);

module.exports = router;
