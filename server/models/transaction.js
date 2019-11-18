const mongoose = require('mongoose')

let Schema = mongoose.Schema

let transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  productList: {
    type:Array,
    validate: {
      validator: function(v) {
          if(v.length > 0){
              return true
          }
          else{
              return false
          }
      },
      message: props => `Product is required`
    }
  },
  status: {
    type: String,
    default: 'onProgress'
  },
  totalPrice: {
    type: Number
  }
}, 
{
  timestamps:true, 
  versionKey: false
})

let Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction
