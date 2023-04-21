const {
  postNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  getSingleNews,
  editNews,
  deleteNews,
  getSingleNewsBySlug,
  login,
  updateSlug,
  getNewsComment,
  bookAppointment,
  updateNews,
  getLikesDislikes,
  loremUpdate,
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
router.get("/update-slug", updateSlug);
router.post("/update-news", updateNews);
router.post("/login", login);
router.post("/book-appointment", bookAppointment);
router.post("/subscribe", bookAppointment);
router.post("/like-dislike", getLikesDislikes);
router.get("/lorem", loremUpdate);

module.exports = router;
