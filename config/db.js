const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URI;

const connectDB = async () => {
    const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
 
    console.log(`MongoDB connected ...`);
};

module.exports = connectDB;