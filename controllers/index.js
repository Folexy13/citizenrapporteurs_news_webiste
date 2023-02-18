require("dotenv").config();
const News = require("../model/news");
const Clicks = require("../model/click");
const Comments = require("../model/comment");
const jwt = require("jsonwebtoken");
const path = require("path");
const nodemailer = require("nodemailer");
const getSlugFromCategory = (input) => {
  if (typeof input === "string") {
    let slug = input
      ?.trim()
      ?.toLocaleLowerCase()
      ?.replace(/\s/g, "-")
      ?.replace(/,/g, "-")
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
  const { id, slug } = req.body;
  await News.findOne(
    { $or: [{ _id: id }, { newsSlug: slug }] },
    (err, news) => {
      if (err) {
        return res.json({
          status: 403,
          message: "Error in fetching news",
          error: err,
        });
      }
      arr.concat(news);
      console.log(arr);
      return res.status(200).json({
        status: 200,
        news: news, //returns latest added five news
      });
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}
async function getSingleNewsBySlug(req, res) {
  const { slug } = req.params;
  // const truncateText = (str, size) => {
  //   return str.length > size ? str.substring(0, size - 3) + "..." : str;
  // };
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
      news, //returns latest added five news
    });
  })
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

async function getTrendingNews() {}
async function postComments(req, res) {
  const { author, email, comment, newsID, website } = req.body;
  let newComment = new Comments();
  newComment.author = author ? author : "guest";
  newComment.email = email;
  newComment.comment = comment;
  newComment.website = website;
  newComment.newsID = newsID;
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

async function postNewsClicks(req, res) {
  const { ip, id } = req.body;

  await Clicks.findOne({ newsID: id }, function (err, data) {
    if (err) {
      return res.json({
        status: 403,
        message: "Error with CLicking",
        error: err,
      });
    } else if (data && data.ip.includes(ip)) {
      return res.json({
        status: 403,
        message: "No Update made",
      });
    } else if (data && !data.ip.includes(ip)) {
      Clicks.findOneAndUpdate(
        { newsID: id },
        { $set: { clicks: data.clicks + 1, ip: [...data.ip, ip] } },
        { new: true },
        (err, clickedNews) => {
          if (err) {
            console.log("Something wrong when updating data");
          }
          return res.status(200).json({
            status: 200,
            message: "Click updated",
            savedNews: clickedNews,
          });
        }
      );
    } else {
      const newClick = new Clicks();
      newClick.userIp = ip;
      newClick.clicks = 1;
      newClick.newsID = id;
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
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}
async function getNewsClicks(req, res) {
  const id = req.params.id;
  await Clicks.findOne({ newsId: id }, function (err, news) {
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
    .clone()
    .catch(function (err) {
      console.log(err);
    });
}
async function getClickedNews(req, res) {
  await Clicks.find({}, function (err, news) {
    if (err) {
      return res.json({
        status: false,
        message: "Error in fecthing clicked news",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        clickedNews: news, //returns latest added ten news
      });
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
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

module.exports = {
  postNews,
  editNews,
  deleteNews,
  postComments,
  getLatestNews,
  getNewsByCategory,
  getTrendingNews,
  subscribe,
  getSearchQuery,
  getNewsComment,
  getSingleNews,
  getSingleNewsBySlug,
  getNewsClicks,
  getClickedNews,
  postNewsClicks,
  bookAppointment,
  login,
  updateSlug,
  updateNews,
  arr,
};
