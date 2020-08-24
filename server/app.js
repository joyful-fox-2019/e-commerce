if (process.env.NODE_ENV === `development` || process.env.NODE_ENV === `test`) {
  require('dotenv').config()
}

// database connection
require('./config/mongoose')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')


const app = express()

// initial middlewares
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', routes)

// errorHandler
app.use(errorHandler)

module.exports = app
