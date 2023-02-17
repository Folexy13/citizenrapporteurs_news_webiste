require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const mustacheExpress = require("mustache-express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const { arr } = require("./controllers");

const app = express();
app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "https://citizenrapporteurs.com/",
//     "https://citizenrapporteurs.com",
//     "https://www.citizenrapporteurs.com/",
//     "https://www.citizenrapporteurs.com",
//     "https://citizen-rapporteur.netlify.app/",
//     "https://citizen-rapporteur.netlify.app",
//     "http://localhost:3000",
//     "http://localhost:8080",
//     "https://www.pluralhealthcareltd.com/",
//     "https://www.pluralhealthcareltd.com",
//     "https://pluralhealthcareltd.com/",
//     "https://pluralhealthcareltd.com",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", true);
//   return next();
// });
app.use(cors("*"));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.render("index", {
    imageUrl: arr.length ? arr.image : "xxx",
  });
});

app.use(router);

module.exports = app;
