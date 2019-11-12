if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const PORT = process.env.PORT
const app = express()

if(process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost:27017/ecommerce-testing',{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(_=>{console.log('mongoose connected')})
        .catch(err=>{console.log(err)})
} else {
    mongoose.connect(process.env.MONGOOSE_URL,{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(_=>{console.log('mongoose connected')})
        .catch(err=>{console.log(err)})
}

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use('/',routes)

app.use(errorHandler)
app.listen(PORT,_=>{console.log(`listening on port ${PORT}`)})

module.exports = app