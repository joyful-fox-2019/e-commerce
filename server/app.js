if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(`mongodb://localhost/ecom-${process.env.NODE_ENV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) console.log(err)
    console.log('connected to mongoose')
})


app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/', routes)

app.use(errorHandler)



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app