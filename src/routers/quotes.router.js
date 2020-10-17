const express = require("express");
const router = new express.Router();

const { sendQuote }=require('../controllers/quotes.controller');

router.get("/sendquote",sendQuote);

module.exports = router;
