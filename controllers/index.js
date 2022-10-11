const News = require("../model/news");

async function postNews(req, res) {
  const { description, video, image, title, category, author, date } = req.body;
  const hasMedia = video || image;
  if (!description || !hasMedia || !title || !category || !author) {
    return res.json({
      status: false,
      message: "All Fields are required",
    });
  }

  const getSlugFromCategory = (category) => {
    let slug = category
      .toLocaleLowerCase()
      .replaceAll(",", "-")
      .split(" ")
      .filter((el) => el.length > 1)
      .join("-");
    return slug;
  };
  const latestNews = new News();
  latestNews.description = description;
  latestNews.video = video;
  latestNews.image = image;
  latestNews.title = title;
  latestNews.category = category;
  latestNews.slug = getSlugFromCategory(category);
  latestNews.author = author;
  latestNews.media = video ? "video " : "image";
  latestNews.createdAt = date ? date : new Date().toISOString();
  latestNews.save(function (err, data) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error with Model",
        error: err,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "News created successfully",
      savedNews: data,
    });
  });
}

async function postComments(req, res) {}

// async function getLatestNews(req, res) {
//   News.find({}, (err, news) => {
//     if (err) {
//       return res.json({
//         status: 403,
//         message: "Error in fetching news",
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       status: 200,
//       news: news.length > 5 ? news.splice(news.length - 5, news.length) : news, //returns latest added five news
//     });
//   });
// }

async function getNewsByCategory(req, res) {
  const query = req.query.category;

  await News.find({ slug: query }, (err, news) => {
    if (err) {
      return res.json({
        status: 403,
        message: "Error in fetching news",
        error: err,
      });
    }
    return res.status(200).json({
      status: 200,
      news: news, //returns latest added five news
    });
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}

async function getNewsComment(req, res) {}

//returns 10 latest
async function getLatestNews(req, res) {
  News.find()
    .sort({ _id: -1 })
    .limit(10)
    .then((news) => {
      return res.status(200).json({
        status: 200,
        news: news, //returns latest added ten news
      });
    })
    .catch((err) => {
      if (err) {
        return res.json({
          status: false,
          message: "Error in fetching news",
          error: err,
        });
      }
    });
}
async function getTrendingNews() {}
async function getSearchQuery(req, res) {}
module.exports = {
  postNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  getTrendingNews,
  getSearchQuery,
  getNewsComment,
};
