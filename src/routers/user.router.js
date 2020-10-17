const express = require("express");
const router = new express.Router();
const {db,admin,ref}=require("../firebase/firebase.utils");

router.get("/test", (req, res) => {
  res.json({ message: true });
});


module.exports = router;
