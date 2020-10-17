const express = require("express");
const bodyParser = require('body-parser')
var cors = require("cors");
require("dotenv").config();
const roomRouter = require("./src/routers/room.router");
const userRouter = require("./src/routers/user.router");
const msgRouter = require("./src/routers/msg.router");
const quoteRouter=require("./src/routers/quotes.router");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/msg", msgRouter);
app.use("/quote",quoteRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Server is up!",
  });
});

app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(port, () => console.log(`App listening on port ${port} !`));
