const { model, Schema } = require('mongoose');

const StoreSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Store need name'],
    unique: true
  },
  Owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  ProductId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ],
  store_image: String,
  background_image: String,
  location: {
    type: String,
    required: [true, 'Store need location']
  }
}, {timestamps: true})

StoreSchema.pre('save', function (next) {
  this.background_image = 'https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1';
  this.store_image = 'https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1';
  this.ProductId = [];
  next()
})

StoreSchema.path('name').validate(function() {
  return Store.findOne({ name: this.name })
    .then(store => {
      if(store) return false;
    })
}, 'Store name allready used!')

const Store = model('stores', StoreSchema)

module.exports = Store;