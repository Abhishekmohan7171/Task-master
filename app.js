require("dotenv").config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
// const userRouter = require('./routes/users');
// const prefRouter = require('./routes/preferences');
// const newsRouter = require('./routes/news');
// const {logger} = require('./middleware/logger');

// Connect to MongoDB
// mongoose.connect(process.env.MONGO).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log('Error connecting to MongoDB', err.message);
// })

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;