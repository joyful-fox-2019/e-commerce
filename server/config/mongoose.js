const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || `mongodb://localhost:27017/ecommerce`

mongoose.connect(mongoUri,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology : true
},(err)=>{ err ? console.log(`problem with mongodb! is not connected`) : console.log(`successfull connect with mongodb`) })