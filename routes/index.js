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
  getClickedNews,
  getSingleNewsBySlug,
  login,
  updateSlug,
} = require("../controllers");

const router = require("express").Router();
// router.get("/", (req, res) => {
//   res.send("Live");
// });
router.post("/create-news", postNews);
router.put("/edit-news/:id", editNews);
router.post("/delete-news", deleteNews);
router.post("/send-comment", postComments);
router.get("/latest-news", getLatestNews);
router.get("/news/", getNewsByCategory);
router.get("/single-news", getSingleNews);
router.get("/single-news/:slug", getSingleNewsBySlug);
router.get("/clicked-news/:id", getNewsClicks);
router.get("/clicked-news", getClickedNews);
router.post("/clicked-news", postNewsClicks);
router.get("/update-slug", updateSlug);
router.post("/login", login);

module.exports = router;
