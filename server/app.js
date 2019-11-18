if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
let URI = process.env.URI

if(process.env.NODE_ENV === 'testing'){
    URI = `mongodb://localhost:27017/ecommerce-${process.env.NODE_ENV}`
}

const app = express()

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log(`connect to mongodb ${URI}`);
    })
    .catch(()=>{
        console.log(`fail connect to mongodb`);
    })


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/', router)
app.use(errorHandler)

// app.listen(PORT, ()=>{
//     console.log(`this app is litening to port `, PORT);
// })

module.exports = app