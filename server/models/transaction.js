const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }, 
  carts : [
    {
        type : Object
    }
  ],
  total : {
    type : Number, 
  },
  status : {
    type: String,
    required: [true, 'please define the status'],
    default: 'on hold for delivery confirmation'
  }
}, {
  versionKey: false,
  timestamps : true
})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction