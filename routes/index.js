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
  getNewsComment,
  bookAppointment,
  updateNews,
} = require("../controllers");

const router = require("express").Router();
// router.get("/", (req, res) => {
//   res.send("Live");
// });
router.post("/create-news", postNews);
router.put("/edit-news/:id", editNews);
router.post("/delete-news", deleteNews);
router.post("/comment", postComments);
router.get("/comment/:id", getNewsComment);
router.get("/latest-news", getLatestNews);
router.get("/news/", getNewsByCategory);
router.post("/single-news", getSingleNews);
router.get("/single-news/:slug", getSingleNewsBySlug);
router.get("/clicked-news/:id", getNewsClicks);
router.get("/clicked-news", getClickedNews);
router.post("/clicked-news", postNewsClicks);
router.get("/update-slug", updateSlug);
router.post("/update-news", updateNews);
router.post("/login", login);
router.post("/book-appointment", bookAppointment);
router.post("/subscribe", bookAppointment);

module.exports = router;
