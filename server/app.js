if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing'){
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(`${process.env.MONGOOSE_URI}-${process.env.NODE_ENV}`, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(_=>{
    console.log('db connected')
  })
  .catch(err=>{
    console.log(err)
  })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.use(errorHandler)

app.listen(port, _=>{
  console.log('listening in port ', port);
})

module.exports = app