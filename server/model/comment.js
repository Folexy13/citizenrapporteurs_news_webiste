const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    news: { type: mongoose.Types.ObjectId, ref: "News" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comments", commentSchema);
