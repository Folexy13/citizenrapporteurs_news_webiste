const News = require("../model/news");
const Clicks = require("../model/click")

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

async function getSingleNews(req, res) {
  const id = req.params.id;
  News.findById({ _id: id }, (err, news) => {
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
  });
}

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
async function getClickedItem() {
  
}
async function getTrendingNews() { }
async function postComments(req, res) { }


async function postNewsClicks(req, res) {
  const id = req.params.id
  const { ip } = req.body;
  Clicks.findOne({ newsID: id }, function (err, data) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error with Model",
        error: err,
      });
    }
     else if (data && data.userIp.includes(ip)) {
      return res.json({
        status: 403,
        message: "No Update made",
      });
    }
   else  if (data && !data.userIp.includes(ip)) {
      Clicks.findOneAndUpdate({ newsID: id }, { $set: { clicks: data.clicks + 1, userIp: [...data.userIp, ip] } }, { new: true }, (err, clickedNews) => {
         if (err) {
        console.log("Something wrong when updating data");
         }
        return res.status(200).json({
      status: 200,
      message: "Click updated",
      savedNews: clickedNews,
    });
       })
    } else {
      const newClick = new Clicks()
    newClick.userIp = ip
    newClick.clicks = 1
    newClick.newsID =id
    newClick.save(function (err, data) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error with Model",
        error: err,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "News was clicked",
      savedNews: data,
    });
  });
    }
   
    
  })
}
async function getNewsClicks(req, res) {
  const id = req.params.id
  Clicks.findOne({ newsId: id }, function (err, news) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error with Model",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        news: news, //returns latest added ten news
      });
    }
  })
}
async function getSearchQuery(req, res) {}
module.exports = {
  postNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  getTrendingNews,
  getSearchQuery,
  getNewsComment,
  getSingleNews,
  getNewsClicks,
  postNewsClicks
};
