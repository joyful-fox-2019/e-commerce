const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySchema = new Schema({
  name:{
    type: String,
    required: [true, 'Name is required']
  }
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category