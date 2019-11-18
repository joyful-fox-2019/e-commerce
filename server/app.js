if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

let port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'testing') {
  port = 4000
}

mongoose.connect(`mongodb://localhost/ecom-${process.env.NODE_ENV}`, 
{ useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false })
  .then(function(){
    console.log("connected to mongodb")
  })
  .catch(function(err){
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log('listening to port', port)
})

module.exports = app