const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { ref } = require("../firebase/firebase.utils");

const check = (req, res) => {
  res.json({ message: true });
};

const createRoom = async (req, res) => {
  const { location, hostId } = req.body;
  chatroomId = uuidv4();
  const chatroom = {
    chatCount: 0,
    key: "3",
    location,
    messages: {},
    users: { [hostId]: true },
  };
  try {
    ref
      .child("Chatroom")
      .child(chatroomId)
      .once("value", function (snapshot) {
        if (snapshot.exists()) {
          res.send(snapshot.val());
        } else {
          ref.child("Chatroom").child(chatroomId).set(chatroom);
          res.send(ref.child("Chatroom").child(chatroomId));
        }
      });
  } catch (err) {
    console.log(err);
    res.send({
      message: false,
      err,
    });
  }
};

const joinRoom = async (req, res) => {
  const { userId, chatroomId } = req.body;
  //append it to users in chat room by userid
  try {
    ref
      .child("Chatroom")
      .child(chatroomId)
      .child("users")
      .update({
        [userId]: true,
      });
    res.send({ message: true });
  } catch (err) {
    console.log(err);
    res.send({
      message: false,
      err,
    });
  }
};

const leaveUser = (req, res) => {
  const { userId, chatroomId } = req.body;
  try {
    // user false
    ref
      .child("Chatroom")
      .child(chatroomId)
      .child("users")
      .update({
        [userId]: false,
      });
    res.send({ message: true });
  } catch (err) {
    console.log(err);
    res.send({
      message: false,
      err,
    });
  }
  // check if room empty
  ref
    .child("Chatroom")
    .child(chatroomId)
    .child("users")
    .once("value", function (snapshot) {
      var usersInRoom = snapshot.val();
      console.log(usersInRoom);
      if (Object.keys(usersInRoom).every((k) => !usersInRoom[k])) {
        // room is empty
        console.log("room is empty");
        // add user count -1 to all users in room
        interactionCount = Object.keys(usersInRoom).length - 1;
        console.log(interactionCount);
      }
    });
};

module.exports = {
  check,
  createRoom,
  joinRoom,
  leaveUser,
};
