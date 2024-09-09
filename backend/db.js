const mongoose = require("mongoose");
const mongouri =
  "mongodb+srv://jainish1945:jainish@cluster0.gtmtljl.mongodb.net/freakers?retryWrites=true&w=majority&appName=Cluster0";
const mongodb = async () => {
  await mongoose.connect(mongouri, {
    useNewUrlParser: true,
  });
  console.log("connected");

  const fetch_data = await mongoose.connection.db.collection("fooddata");
  const data = await fetch_data.find({}).toArray();
  global.food_items = data;
  const Category = await mongoose.connection.db.collection("food_category");
  const foodCategory = await Category.find({}).toArray();
  global.food_category = foodCategory;
};

module.exports = mongodb;
