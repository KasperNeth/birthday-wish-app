const mongoose = require("mongoose");
require("dotenv").config();


const MONGODB_URI = process.env.MONGODB_URI;


// connect to mongodb
function connectToMongoDB() {
  console.log('connecting to db...')
  mongoose.connect(MONGODB_URI);
 
  mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB successfully');
  });

  mongoose.connection.on('error', (err) => {
      console.log('Error connecting to MongoDB', err);
  })
}


module.exports = { connectToMongoDB };