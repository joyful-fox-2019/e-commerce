if (process.env.NODE_ENV == 'testing' || process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

const mongoConfig =  { 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true, 
    useFindAndModify:false
}

mongoose.connect(process.env.MONGOOSE_URL + process.env.NODE_ENV, mongoConfig, (err) => {
    if (err) console.log(err)
    console.log('database connected')    
})

app.use('/', router)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`kamu terhubung ${PORT}`)
})
module.exports = app