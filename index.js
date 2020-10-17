const express = require("express");
var cors = require("cors");
require("dotenv").config();
const roomRouter = require("./src/routers/room.router");
const userRouter = require("./src/routers/user.router");
const msgRouter = require("./src/routers/msg.router");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/msg", msgRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Server is up!",
  });
});

app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(port, () => console.log(`App listening on port ${port} !`));
