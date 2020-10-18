const express = require("express");

("use strict");

const sendQuote = async (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var randomno = getRandomInt(4800);

  let jsonData = require("../../quotes.json");
  const quote = jsonData[randomno].Quote;
  res.send({ message: quote });
};

module.exports = {
  sendQuote,
};
