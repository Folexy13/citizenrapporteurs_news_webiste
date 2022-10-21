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
    image: new mongoose.Schema({ any: mongoose.Schema.Types.Mixed }),
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
    comments: { type: mongoose.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("News", newsSchema);
