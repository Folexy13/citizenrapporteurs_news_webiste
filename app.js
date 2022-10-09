require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");

const router = require("./routes");

const app = express();

//cors middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://citizenrapporteurs.com",
    "https://www.citizenrapporteurs.com/",
    "https://citizen-rapporteur.netlify.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(router);

module.exports = app;
