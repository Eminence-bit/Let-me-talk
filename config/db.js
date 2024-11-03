const mongoose = require("mongoose");

const uri =
  "mongodb+srv://prajyothnani123:root@mydatabase.ndjzos2.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase";
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
