require('dotenv').config();
const mongoose = require('mongoose');
const UserModel = require('./Models/User');
const conn = process.env.conn;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(conn);

    const categories_data = mongoose.connection.db.collection("categories");
    global.catData = await categories_data.find({}).toArray();

    const product_data = mongoose.connection.db.collection("products");
    global.productData = await product_data.find({}).toArray();

    console.log("Connection successfully established");
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectToDatabase;
