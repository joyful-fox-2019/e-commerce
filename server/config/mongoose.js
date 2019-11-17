const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ecommerce',{
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : true,
    useUnifiedTopology : true
},(err)=>{ err ? console.log(`problem with mongodb! is not connected`) : console.log(`successfull connect with mongodb`) })