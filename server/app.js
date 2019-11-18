if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'){
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)

mongoose.connect(`mongodb+srv://evanskarlin:${process.env.PASS_MONGOOSE}@cluster0-c14m1.mongodb.net/FRESHMEAL-${process.env.NODE_ENV}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
    .then(_=> {
        console.log("mongoodb successfully connect");
    })
    .catch(console.log)


app.use(errorHandler)

app.listen(PORT,_=>{console.log(`listening on port ` + PORT)})

module.exports = app
