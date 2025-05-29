require('dotenv').config()
const mongoose = require("mongoose")
const URI = process.env.DB_PASSWORD
const conectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("DB active");
    } catch (error) {
        console.log("conection Failed ❌", error);
    }
}
module.exports = conectDb