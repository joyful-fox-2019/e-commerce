if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
  require('dotenv').config()
  console.log(process.env.NODE_ENV, 'NODE-ENV=================');
}

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT
let uri

if(process.env.NODE_ENV === 'development' || process.NODE_ENV === 'testing'){
  uri = `${process.env.MONGO_URI}-${process.env.NODE_ENV}`
} else {
  uri = process.env.MONGO_URI_PROD
}

const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

//  DB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err))

const app = express()

//  MIDDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => { console.log('running on port ', port)})

module.exports = app
