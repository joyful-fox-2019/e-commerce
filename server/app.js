if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const index = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => console.log(`Mongo DB now Connected!`))
  .catch(console.log)

app.use('/', index);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))


module.exports = app;