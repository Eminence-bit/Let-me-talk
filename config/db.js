const mongoose = require('mongoose');

const uri = "mongodb+srv://prajyothnani123:root@mydatabase.ndjzos2.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabase";

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
