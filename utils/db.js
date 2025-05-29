require('dotenv').config();  // Load environment variables from .env

const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {


    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI);

        console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not Set");

        await mongoose.connect(URI);
        console.log("DB active");
    } catch (error) {
        console.log("connection Failed ❌", error);
    }
};

module.exports = connectDb;
