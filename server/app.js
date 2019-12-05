if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGOOSE_URI, {
  useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true
})
  .then(_ => {
    console.log('db connected')
  })
  .catch(err => {
    console.log('db connection failed', err)
  })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

module.exports = app