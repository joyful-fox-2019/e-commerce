const mongoose = require('mongoose')

let Schema = mongoose.Schema

let transactionSchema = new Schema({
    products: [],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    deliverStatus: {
      type: Boolean,
      default: false
    },
    totalPrice : {
      type: Number,
      default: 0
    }
},{ timestamps: true,versionKey:false })

let Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction

