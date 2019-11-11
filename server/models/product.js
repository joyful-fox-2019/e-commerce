const {
    Schema,
    model
} = require('mongoose')

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input your product name'],
        validate: {
            validator: function (name) {
                return /^[A-Za-z]+$/.test(name)
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    price: {
        type: Number,
        min: [100, 'Sorry,minimum product price is Rp.100'],
        required: [true, 'Please input your product price']
    },
    stock: {
        type: Number,
        min: [0, 'Sorry,minimum product stock is 0'],
        required: [true, 'Please input your product stock']
    },
    image: {
        type: String,
        required: [true, 'Please input your product image']
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Product = model('Product', productSchema)

module.exports = Product