require("dotenv").config();
const News = require("../model/news");
const Comments = require("../model/comment");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ipaddr = require("ipaddr.js");
const paginatedData = require("../utils/Paginate");
const getSlugFromCategory = (input) => {
  if (typeof input === "string") {
    let slug = input
      ?.trim()
      ?.toLocaleLowerCase()
      ?.replace(/\s/g, "-")
      ?.replace(/,/g, "-")
      ?.replace(/'|"~|@/g, "-")
      ?.replace(/"/g, "-")
      ?.replace(/[^\w\s_.,-/#-'"]/g, "-")
      ?.split("-");
    slug = slug
      .map((el) => el.trim())
      .filter((el) => el !== "")
      .join("-");
    return slug;
  }
};
async function postNews(req, res) {
  const { description, video, images, title, category, author, date } =
    req.body;
  const hasMedia = video || images.length;
  News.findOne({ title }, (err, news) => {
    if (news)
      return res.json({
        status: false,
        message: "News Already exist",
      });
  });
  if (!description || !hasMedia || !title || !category || !author) {
    return res.json({
      status: false,
      message: "All Fields are required",
    });
  }

  const latestNews = new News();
  latestNews.description = description;
  latestNews.video = video;
  latestNews.image = images;
  latestNews.title = title;
  latestNews.category = category;
  latestNews.slug = getSlugFromCategory(category);
  latestNews.author = author;
  latestNews.newsSlug = getSlugFromCategory(title);
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
async function updateNews(req, res) {
  const { description, video, image, title, category, author, date, _id } =
    req.body;
  const news = await News.findByIdAndUpdate(
    { _id },
    {
      description,
      video,
      image,
      date,
      category,
      title,
      author,
      slug: getSlugFromCategory(category),
      newsSlug: getSlugFromCategory(title),
      media: video ? "video " : "image",
    },
    { new: true }
  );
  // console.log(news);
  if (!description || !title || !category || !author) {
    return res.json({
      status: false,
      message: "All Fields are required",
    });
  }
  if (news) {
    return res.status(200).json({
      status: 200,
      message: "News edited successfully",
      savedNews: news,
    });
  }
}
async function editNews(req, res) {
  let { id } = req.params;
  const { description, video, image, title, category, author, date } = req.body;
  const hasMedia = video || image;
  if (!description || !hasMedia || !title || !category || !author) {
    return res.json({
      status: false,
      message: "All Fields are required",
    });
  }
  News.findByIdAndUpdate(
    { _id: id },
    {
      description,
      media: video ? "video" : "image",
      video,
      image,
      createdAt: date ? date : new Date().toISOString(),
      author,
      slug: getSlugFromCategory(category),
      title,
      category,
    },
    { new: true },
    (err, news) => {
      if (err) {
        return res.json({
          status: 403,
          message: "Error in updating news",
          error: err,
        });
      } else if (!news) {
        return res.json({
          status: 403,
          message: "News Update went wrong",
          news: [],
        });
      } else {
        return res.status(200).json({
          status: 200,
          news: news, //returns latest added five news
        });
      }
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}
async function deleteNews(req, res) {
  let { id } = req.body;
  await News.findByIdAndDelete({ _id: id }, function (err, news) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error in deleting news",
        error: err,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "News deleted",
    });
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}
let arr = [];
async function getSingleNews(req, res) {
  const { id, slug, ip } = req.body;
  const isNews = await News.findOne({
    $or: [{ _id: id }, { newsSlug: slug }],
  });
  if (!isNews.ipAddresses.includes(ip)) {
    const updatedNews = await News.findOneAndUpdate(
      { $or: [{ _id: id }, { newsSlug: slug }] },
      { $push: { ipAddresses: ip }, $inc: { views: 1 } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      news: updatedNews,
    });
  } else {
    const updatedNews = await News.findOneAndUpdate(
      { $or: [{ _id: id }, { newsSlug: slug }] },
      { $push: { ipAddresses: ip } },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      news: updatedNews,
    });
  }
}
async function getSingleNewsBySlug(req, res) {
  const { slug } = req.params;

  await News.findOne({ slug }, (err, news) => {
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
async function getNewsByCategory(req, res) {
  const { category, page } = req.query;
  await News.find({ slug: category }, (err, news) => {
    if (err) {
      return res.json({
        status: 403,
        message: "Error in fetching news",
        error: err,
      });
    }
    let result = paginatedData(news, page);
    return res.status(200).send(result);
  })
    .limit(40)
    .sort({ _id: -1 })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}

async function getNewsComment(req, res) {
  let { id } = req.params;
  const comments = await Comments.find({ newsID: id });
  return res.status(200).json({
    status: true,
    comments: comments, //returns latest added ten news
  });
}
async function getLikesDislikes(req, res) {
  let { like, dislike, email, id, commenter } = req.body;
  let updateLike = {
    $inc: { likes: like },
    $addToSet: { commenter: email },
    $set: { commenter },
  };
  let updateDisLike = {
    $inc: { dislike: dislike },
    $addToSet: { commenter: email },
    $set: { commenter },
  };
  try {
    const updateStatus = like
      ? await Comments.findByIdAndUpdate({ _id: id }, updateLike, { new: true })
      : await Comments.findByIdAndUpdate({ _id: id }, updateDisLike, {
          new: true,
        });
    if (updateStatus) {
      return res.status(200).send({
        status: true,
        message: "Update success",
      });
    }
    if (!updateStatus) {
      return res.status(200).send({
        status: false,
        message: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
//returns 10 latest
async function getLatestNews(req, res) {
  await News.find()
    .sort({ _id: -1 })
    .limit(10)
    .then((news) => {
      return res.status(200).json({
        status: 200,
        news, //returns latest added ten news
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

async function postComments(req, res) {
  const { author, email, comment, newsID, website } = req.body;
  let newComment = new Comments();
  newComment.author = author ? author : "guest";
  newComment.email = email;
  newComment.comment = comment;
  newComment.website = website;
  newComment.newsID = newsID;
  newComment.likes = 0;
  newComment.dislikes = 0;
  newComment.save(function (err, data) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error with Model",
        error: err,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Comment posted successfully",
    });
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  const token = jwt.sign({ username, password }, "process.env.JWT_TOKEN", {
    expiresIn: "3h",
  });
  if (username !== "citizen-admin" || password !== "adminffegg") {
    return res.json({
      status: false,
      message: "Incorrect Login Details",
    });
  }
  return res.json({
    status: true,
    message: "Login Sucessfully",
    token,
  });
}

async function getSearchQuery(req, res) {
  const { slug } = req.body;
  News.find({ $or: { author: slug, description: slug, category: slug } });
}

async function updateSlug(req, res) {
  News.find({}, (err, news) => {
    for (let i = 0; i < news.length; i++) {
      News.findByIdAndUpdate(
        { _id: news[i]?._id },
        { newsSlug: getSlugFromCategory(news[i]?.title) },
        (err, news) => {
          if (err) console.log(err);
          console.log(news);
          console.log(news[i]?.title);
        }
      );
    }
  });
}

async function bookAppointment(req, res) {
  const { name, phone, email, service, date, message } = req.body;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "folajimiopeyemisax13@gmail.com",
      pass: process.env.PASS, //_wr(d+.3-JMk
    },
  });

  let mailDetails = {
    from: "noreply@pluralhealthcareltd.com<info@pluralhealthcareltd.com>",
    to: "info@pluralhealthcareltd.com",
    subject: "New Appointment",
    html: `<h2>Hi Admin,you got a new appointment</h2></br><div><p>Name: <b>${name}</b></p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Service: ${service}</p><p>Appointment Date:${date}</p><p>Message: ${message}</p></div>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
      console.log(err);
    } else {
      res.json({
        status: true,
        message: "Appointment was successful",
      });
    }
  });
}

async function subscribe(req, res) {
  const { email } = req.body;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "folajimiopeyemisax13@gmail.com",
      pass: process.env.PASS, //_wr(d+.3-JMk
    },
  });

  let mailDetails = {
    from: "noreply@pluralhealthcareltd.com<info@pluralhealthcareltd.com>",
    to: "info@pluralhealthcareltd.com",
    subject: "New Subscription",
    html: `<div>Hi Admin,A new user with email ${email} just joined the subscription list</div>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
      console.log(err);
    } else {
      res.json({
        status: true,
        message: "Appointment was successful",
      });
    }
  });
}

async function getNews(req, res) {
  const latestNews = await News.find().sort({ _id: -1 }).limit(10);
  const newsCategory = await News.find({ slug: "breaking-news" });
  const politicsCategory = await News.find({ slug: "politics" });
  const businessCategory = await News.find({ slug: "business" });
  const entertainmentCategory = await News.find({ slug: "entertainment" });
  const opinionCategory = await News.find({ slug: "opinions" });
  const sportCategory = await News.find({ slug: "sport" });
  const crimeCategory = await News.find({ slug: "crime-report" });

  res.status(200).send({
    latestNews,
    newsCategory,
    politicsCategory,
    businessCategory,
    entertainmentCategory,
    opinionCategory,
    sportCategory,
    crimeCategory,
  });
}
async function loremUpdate(req, res) {
  const loremUpdateAll = await News.updateMany({ views: 0, ipAddresses: [] });
  if (loremUpdateAll) return res.sendStatus(200);
}
module.exports = {
  postNews,
  editNews,
  deleteNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  subscribe,
  getSearchQuery,
  getNewsComment,
  getSingleNews,
  getSingleNewsBySlug,
  bookAppointment,
  login,
  getNews,
  updateSlug,
  updateNews,
  getLikesDislikes,
  loremUpdate,
};
