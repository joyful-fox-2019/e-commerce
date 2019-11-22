const { model, Schema} = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    minlength: [3, 'name min 3 char'],
    required: [true, 'name is required'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  condition: String,
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  stock: {
    type: Number,
    required: [true, 'stock is required']
  },
  product_image: String,
  StoreId: {
    type: Schema.Types.ObjectId,
    ref: 'stores'
  },
  category: []
}, {timestamps: true})

ProductSchema.path('name').validate(function() {
  return Product.findOne({ name: this.name })
    .then(product => {
      if(product) return false
    })
}, 'Product name allready used')



const Product = model('products', ProductSchema);

module.exports = Product;