const express = require("express");
const { ref } = require("../firebase/firebase.utils");

const {
  uniqueNamesGenerator,
  colors,
  animals,
} = require("unique-names-generator");

const shortName = uniqueNamesGenerator({
  dictionaries: [colors, animals],
  length: 2,
});

const sendAllData = (req, res) => {
  try {
    ref.once("value", function (snapshot) {
      const data = snapshot.val();
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(400).send({ message: false });
  }
};

const userAccount = (req, res) => {
  var chatcount = 0;
  var screenTime = 0;
  try {
    var {
      uuid = "nouuidgiven",
      firstName = "namenotgiven",
      location = "notgiven",
      randomimage = "urlnotgiven",
    } = req.body;
    var displayName = shortName;

    ref
      .child("Users")
      .child(uuid)
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          res.status(200).send(snapshot.val());
        } else {
          ref.child("Users").child(uuid).set({
            chatcount,
            firstName,
            location,
            screenTime,
            displayName,
            randomimage,
          });
          ref
            .child("Users")
            .child(uuid)
            .once("value", function (snapshot) {
              res.status(200).send(snapshot.val());
            });
        }
      });
  } catch (e) {
    res.status(400).send({ message: false });
  }
};

const sendUser = (req, res) => {
  try {
    const { uuid = "nouidgiven" } = req.body;
    ref
      .child("Users")
      .child(uuid)
      .on("value", function (snapshot) {
        var data = snapshot.val();
        res.status(200).send(data);
      });
  } catch (e) {
    res.status(400).send({ essage: false });
  }
};

const updateScreenTime = (req, res) => {
  try {
    const { uuid = "nonegiven", screenTime = 0 } = req.body;
    var finalTime;

    var data;

    ref
      .child("Users")
      .child(uuid)
      .once("value", function (snapshot) {
        data = snapshot.val().screenTime;
      })
      .then((lol) => {
        finalTime = lol.val().screenTime + screenTime;
        console.log(finalTime);
        ref.child("Users").child(uuid).update({
          screenTime: finalTime,
        });
      });
    res.status(200).send({ message: true });
  } catch (e) {
    res.status(400).send({ message: false });
  }
};

module.exports = {
  sendAllData,
  userAccount,
  sendUser,
  updateScreenTime,
};
