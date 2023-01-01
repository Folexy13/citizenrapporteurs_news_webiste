const http = require("http");

require("dotenv").config();

const { mongoConnect } = require("./config/db.config");
mongoConnect();
const port = process.env.PORT || 8087;
// const port = 8081;

// const server = http.createServer(app);

// async function startServer() {
//   await mongoConnect();

//   // server.listen(port, () => {
//   //   console.log(`Listening on port ${port}...`);
//   // });
// }

// startServer();
const path = require("path");
const express = require("express");
const cors = require("cors");

const morgan = require("morgan");

const router = require("./routes/");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);

app.get("/", (req, res) => {
  res.send("Hi Live ");
});

app.listen("5000", () => console.log("Listening on port 5000"));

module.exports = app;
