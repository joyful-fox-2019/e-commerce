if(process.env.NODE_ENV==='development' || process.env.NODE_ENV==='testing'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(process.env.URL_MONGOOSE + `${process.env.NODE_ENV}`, 
{useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false})
.then(_=>{
    console.log('connected to database')
})
.catch(err=>{
    console.log(err)
    console.log('fail to connect database')
})

app.use('/', routes)

app.use(errorHandler)

app.listen(PORT, _=>{
    console.log('listening to PORT', PORT)
})

module.exports = app