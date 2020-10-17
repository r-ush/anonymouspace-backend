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
  }
};

const joinRoom = async (req, res) => {
  const { userId, chatroomId } = req.body;
  //append it to users in chat room by userid
  res.send({ message: true });
};

const leaveUser = (req, res) => {
  const { userId, chatroomId } = req.body;
  // user false
  // check if room empty
  // add user count -1 to all users in room
};

module.exports = {
  check,
  createRoom,
  joinRoom,
  leaveUser,
};
