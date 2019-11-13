const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }, 
  carts : [
    {
      productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
      }
    }
  ],
  total : {
    type : Number, 
  }
}, {
  versionKey: false,
  timestamps : true
})

const Transaction = model('Transacction', transactionSchema)

module.exports = Transaction