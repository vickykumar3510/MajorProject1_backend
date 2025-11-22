const mongoose = require('mongoose');
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

const initializeDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected to database.");
    } catch (error) {
        console.error("Error connecting to Database", error);
    }
};

module.exports = { initializeDatabase };
