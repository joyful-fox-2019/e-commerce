`use strict`
if (process.env.NODE_ENV) {
    require('dotenv').config()
}

const express = require('express')
const port = process.env.port || 3000
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

mongoose.
    connect('mongodb://localhost/e-commerce', {useNewUrlParser: true, useUnifiedTopology: true} )
    .then( () => {
        console.log(`server is connected`)
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(morgan('dev'))


app.use('/', routes)
app.use(errorHandler)

app.listen(port, function() {
    console.log(`running on port ${port}`)
})

module.exports = app




