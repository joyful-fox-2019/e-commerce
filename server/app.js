// const NODE_ENV = process.env.NODE_ENV
if (process.env.NODE_ENV==='development' || process.env.NODE_ENV==='test') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT
const indexRouter = require('./routes/index')
const errHandler = require('./middlewares/errHandler')

mongoose.connect('mongodb://localhost/e-testing', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to mongoDb')
});

//app.use
app.use(morgan('combined'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/',indexRouter)
app.use(errHandler)

app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`)
})

module.exports = app

