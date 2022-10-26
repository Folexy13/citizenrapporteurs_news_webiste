const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    ip: {
      type: [String],
      required: true,
        },
        clicks: {
          type:Number
      },
    newsID: { type:String},
  },
);
module.exports = mongoose.model("Click", clickSchema);
