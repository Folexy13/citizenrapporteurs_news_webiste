const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
    },
    commenter: mongoose.Schema.Types.Mixed,
    likes: Number,
    dislikes: Number,
    newsID: { type: String, required: "true" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comments", commentSchema);
