const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    userIp: {
      type: String,
      required: true,
        },
        clicks: {
          type:String
      },
    news: { type: mongoose.Types.ObjectId, ref: "News" },
  },
);
module.exports = mongoose.model("Clicks", clickSchema);
