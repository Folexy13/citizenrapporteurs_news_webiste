require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const newsData = require("./newsSeeder");
const newsModel = require("../model/news");
// initialize the db connection
const importData = async () => {
  await connectDB();
  try {
    await newsModel.deleteMany({});
    await newsModel.insertMany(newsData);

    console.info("Students added to Database successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    console.error("Error in Data import");
    process.exit(1);
  }
};

importData();
