if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if(process.env.NODE_ENV === 'testing') {
    mongoose.connect('mongodb://localhost/E-Commerce-testing', { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true, useCreateIndex: true }, function(err) {
        if(err) console.log(`Failed to connect to db ಠ_ಠ`)
        else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Connected to db `);
    })
} else {
    mongoose.connect(process.env.URL_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true, useCreateIndex: true }, function(err) {
        if(err) console.log(`Failed to connect to db ಠ_ಠ`)
        else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Connected to db `);
    })
}

app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, ()=> console.log('╚(ಠ_ಠ)=┐ Running on port: ', PORT))

module.exports = app