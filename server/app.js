if (process.env.NODE_ENV) {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {console.log('success connecting to database')},
        (err) => {console.log(err)});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use(errorHandler);

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

module.exports = app