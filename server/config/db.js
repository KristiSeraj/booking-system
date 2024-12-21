const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connected to DB');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;