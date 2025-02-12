const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGODB_URL;
//const mongoURL = process.env.MONGODB_URL_LOCAL

const connectDB = async () => {
    try {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(mongoURL, {});
  
      console.log('MongoDB connected successfully');
    } catch (error) {
      // If there's an error in connecting to the DB, it will log here
      console.error('Error while connecting to the database:', error);
    }
  };
  
  module.exports = connectDB();