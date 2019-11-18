const mongoose = require('mongoose')
const mongoUri = process.env.MONGODB

const mongoConfig = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}

mongoose.connect(`${mongoUri}-${process.env.NODE_ENV}`, mongoConfig, function(err) {
  if(err) console.log('failed connect database')
  else console.log('success connect database')
})