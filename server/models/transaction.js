const {
    Schema,
    model
} = require('mongoose')

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator(value){
                return value < 1 ? false:true
            },
            message: 'Minimum quantity is 1'
        }
    },
    subTotal: {
        type: Number,
        required: true
    },
    checkout: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction