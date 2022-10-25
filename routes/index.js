const {
  postNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  getSingleNews,
  getNewsClicks,
  postNewsClicks,
  editNews,
  deleteNews,
  getClickedNews
} = require("../controllers");

const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("Live");
});
router.post("/create-news", postNews);
router.put("/edit-news/:id",editNews)
router.delete("/delete-news/:id",deleteNews)
router.post("/send-comment", postComments);
router.get("/latest-news", getLatestNews);
router.get("/news/", getNewsByCategory);
router.get("/single-news/:id", getSingleNews);
router.get('/clicked-news/:id', getNewsClicks)
router.get('/clicked-news',getClickedNews)
router.post('/clicked-news/',postNewsClicks)

module.exports = router;
