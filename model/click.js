const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    userIp: {
      type: [Number],
      required: true,
        },
        clicks: {
          type:Number
      },
    newsID: { type:String},
  },
);
module.exports = mongoose.model("Click", clickSchema);
