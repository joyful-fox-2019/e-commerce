const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/click'

const mongoConfig = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    
}

mongoose.connect(mongoUri, mongoConfig, function(err) {
    if (err) console.log('db disconnected');
    else console.log('db connected');
    
})