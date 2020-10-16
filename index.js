const express = require("express");
var cors = require("cors");
const Router = require("./src/routers/sample.router");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/router", Router);

app.get("/", (req, res) => {
  res.json({
    message: "Server is up!",
  });
});

app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(port, () => console.log(`App listening on port ${port} !`));
