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
          res.send({chatroomID:chatroomId,data:snapshot.val()});
        } else {
          ref.child("Chatroom").child(chatroomId).set(chatroom);
          ref
            .child("Chatroom")
            .child(chatroomId)
            .once("value", function (snapshot) {
              res.send({chatroomID:chatroomId,data:snapshot.val()});
            });
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
      .set({
        [userId]: false,
      });
    ref
    .child("Chatroom")
    .child(chatroomId)
    .child("users")
    .once("value", function (snapshot) {
      var usersInRoom = snapshot.val();
      if (Object.keys(usersInRoom).every((k) => !usersInRoom[k])) {
        // room is empty
        usersInRoom = Object.keys(usersInRoom);
        // add user count -1 to all users in room
        interactionCount = usersInRoom.length - 1;
        usersInRoom.forEach((user) => {
          try {
            ref
              .child("Users")
              .child(user)
              .once("value", function (snapshot) {
                var data = snapshot.val();
                if(data)
                {
                  newChatCount = data.chatCount + interactionCount;
                }
                else
                {
                  newChatCount = interactionCount;
                }
                try {
                  ref.child("Users").child(user).update({
                    chatCount: newChatCount,
                  });
                } catch (err) {
                  console.log(err);
                  res.send({
                    message: false,
                    err,
                  });
                }
              });
          } catch (err) {
            console.log(err);
            res.send({
              message: false,
              err,
            });
          }
        });
        res.send({ message: true });
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

module.exports = {
  check,
  createRoom,
  joinRoom,
  leaveUser,
};
