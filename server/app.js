if (process.env.NODE_ENV == 'develpment' || process.env.NODE_ENV == 'test') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const connection = process.env.CONNECTION
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/index')
const err = require('./middlewares/errHandler')

mongoose.connect(connection, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(_ => {
  console.log('connect');
}).catch(err => {
  console.log(err);
})
// const db = mongoose.connection
// db.on('error', console.error.bind(console, `connection error`))
// db.once('open', function () {
//   console.log(`Mongoose connected!`);
// })


app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', router)
app.use(err)

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
})

module.exports = app