require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const indexPath = path.resolve(__dirname, "build", "index.html");
const router = require("./routes");
const { getSingleNews } = require("./controllers");

const app = express();

// cors middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://citizenrapporteurs.com/",
    "https://citizenrapporteurs.com",
    "https://www.citizenrapporteurs.com/",
    "https://www.citizenrapporteurs.com",
    "https://citizen-rapporteur.netlify.app/",
    "https://citizen-rapporteur.netlify.app",
    "http://localhost:3000",
    "http://localhost:8080",
    "https://celadon-halva-7a36a9.netlify.app",
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
  // fs.readFile(indexPath, "utf8", (err, htmlData) => {
  //   if (err) {
  //     console.error("Error during file reading", err);
  //     return res.status(404).end();
  //   }
  //   // get post info
  //   const post = getSingleNews();
  //   // if (!post) return res.status(404).send("Post not found");
  //   console.log(post);
  //   // inject meta tags
  //   htmlData = htmlData
  //     .replace("__META_OG_TITLE__", post.title)
  //     .replace("__META_OG_DESCRIPTION__", post.description)
  //     .replace("__META_DESCRIPTION__", post.description)
  //     .replace("__META_OG_IMAGE__", post.image);
  //   return res.send(htmlData);
  // });
});

app.use(router);

module.exports = app;
