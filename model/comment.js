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
    },
    comment: {
      type: String,
      required: true,
    },
    newsID: { type: String, required: "true" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comments", commentSchema);
