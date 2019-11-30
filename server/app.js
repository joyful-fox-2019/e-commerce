if(process.env.NODE_ENV) require('dotenv').config()

require('./config/mongoConnect')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const router = require('./routers')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
  console.log("App listen on port " + port)
})

module.exports = app