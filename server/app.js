if(process.env.NODE_ENV === 'development' ||process.env.NODE_ENV === "test"){
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const errorHandling = require('./middlewares/errorHandler')
const router = require('./routes')
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

mongoose.connect(`${process.env.MONGO_DB}-${process.env.NODE_ENV}`, {useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true})
  .then(()=>{
    console.log(`Connected on database ${process.env.NODE_ENV}`);
  })
  .catch((err)=>{
    console.log(err);
  })


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors())


app.use('/',router)
app.use(errorHandling)


app.listen(PORT,()=>{
  console.log(`Connencted on ${PORT}`)
})


module.exports = app