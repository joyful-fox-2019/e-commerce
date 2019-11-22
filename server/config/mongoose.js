const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(success => {
        console.log('Success to connect database')
    })
    .catch(err => {
        console.log(err)
        console.log("Failed to connect database")
    })

module.exports = mongoose