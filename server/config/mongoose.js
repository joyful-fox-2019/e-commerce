const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI // || 'mongodb://localhost:27017/tembikar'

const mongoConfig = {
  useCreateIndex : true,
  useNewUrlParser : true,
  useFindAndModify : true,
  useUnifiedTopology : true
}

mongoose.connect(`${mongoURI}-${process.env.NODE_ENV}`, mongoConfig, function(err) {
  if(err) {
    console.log(`Database connection failed`);
  } else {
    console.log(`Database connection success`); 
  }
})