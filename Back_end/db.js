require('dotenv').config();
const mongoose = require('mongoose');
const UserModel = require('./models/User');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(conn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // This option is to avoid deprecation warnings
    });

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
