const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      // required: true,
    },
    image: mongoose.Schema.Types.Mixed,
    newsSlug: String,
    video: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    media: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    ipAddresses: [],
    comments: { type: mongoose.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("News", newsSchema);
