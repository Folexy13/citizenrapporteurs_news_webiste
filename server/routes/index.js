const {
  postNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
} = require("../controllers");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("Live");
});
router.post("/create-news", postNews);
router.post("/send-comment", postComments);
router.get("/latest-news", getLatestNews);
router.get("/news/", getNewsByCategory);

module.exports = router;
