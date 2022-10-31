require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");

const app = express();

// cors middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://citizenrapporteurs.com/",
    "https://citizenrapporteurs.com",
    "https://www.citizenrapporteurs.com/",
    "https://www.citizenrapporteurs.com",
    "https://cr-news-api.herokuapp.com/",
    "https://citizen-rapporteur.netlify.app/",
    "https://citizen-rapporteur.netlify.app",
    "http://localhost:3000",
    "http://localhost:8080",
    "https://www.celadon-halva-7a36a9.netlify.app",
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
// app.use(cors("*"));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(router);

module.exports = app;
