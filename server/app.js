if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing') {
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = 3000 || process.env.PORT

mongoose.connect(`mongodb://localhost/ecommerce-${process.env.NODE_ENV}`, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log('Mongoose is successfully connected')
    })
    .catch(console.log)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})

module.exports = app