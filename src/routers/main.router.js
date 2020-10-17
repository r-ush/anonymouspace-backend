const express = require("express");
const router = new express.Router();

router.get("/user", (req, res) => {
  res.json({ message: true });
});

module.exports = router;
