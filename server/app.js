if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

// mongoose area
require('./config/mongoose')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// routes area
app.use('/', routes)

// error area
app.use(errorHandler)

app.listen(PORT, (_=>{ console.log(`listen to port`, PORT)}))

module.exports = app