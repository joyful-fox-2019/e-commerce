if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors')
const logger = require('morgan')

const PORT = process.env.PORT
let MONGO_DB = process.env.MONGODB_URL

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'))

if (process.env.NODE_ENV === 'testing') {
  MONGO_DB = process.env.MONGODB_TEST
}

mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log('could not connect to mongodb')
  })


app.use('/', routes);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Listening to port ' + PORT)
})

module.exports = app;
