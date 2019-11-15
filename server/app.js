if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV == 'testing'){
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const errorHandler = require('./helpers/errorHandlers')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

let NODE_ENV = process.env.NODE_ENV
const db = NODE_ENV? `mongodb://localhost/ecom${NODE_ENV}`:'mongodb://localhost/mini-e-commerce'

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(_=> {
    console.log("mongoodb successfully connected");
})
.catch(console.log)



app.use('/',routes)
app.use(errorHandler)


app.listen(PORT,_=>{
    console.log(`listening on port ` + PORT)
})

module.exports = app