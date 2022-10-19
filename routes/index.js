const {
  postNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  getSingleNews,
} = require("../controllers");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("Live");
});
router.post("/create-news", postNews);
router.post("/send-comment", postComments);
router.get("/latest-news", getLatestNews);
router.get("/news/", getNewsByCategory);
router.get("/single-news/:id", getSingleNews);

module.exports = router;
