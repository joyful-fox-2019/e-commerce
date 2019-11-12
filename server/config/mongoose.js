const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/ecommerce-${process.env.NODE_ENV}`, {
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