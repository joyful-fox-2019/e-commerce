const Product = require('../models/product');
const User = require('../models/user');
const Store = require('../models/Store');


module.exports = {
  findAllProduct (req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json({products})
      })
      .catch(next)
  },
  findOneProduct (req, res, next) {
    const id = req.params.id;
    Product.findById(id).populate('Category').populate('StoreId')
      .then(product => {
        res.status(200).json({ product })
      })
      .catch(next)
  },
  createProduct (req, res, next) {
    const { name, description, price, stock, category } = req.body;
    const id = req.loggedUser.id
    let storeId,
      tempProduct
    User.findById(id)
      .then(user => {
        if(!user.StoreId) return 
        else {
          storeId = user.StoreId
          return Product.create({ name, description, price, stock, StoreId: user.StoreId, category })
        }
      })
      .then(product => {
        if(!product) return
        else {
          tempProduct = product
          return Store.findByIdAndUpdate(storeId, {$push: {ProductId: product._id}}, {new: true})
        }
      })
      .then(store => {
        if(!store) next({status: 404, msg: 'You have no shop'})
        else {
          res.status(201).json({product: tempProduct, store, msg: 'product success create!'})
        }
      })
      .catch(next)
  },
  deleteProduct (req, res, next) {
    const id = req.params.id
    let tempStoreId
    Product.findById(id)
      .then(product => {
        tempStoreId = product.StoreId
        return Product.findByIdAndDelete(id)
      })
      .then(() => {
        return Store.findByIdAndUpdate(tempStoreId, {$pull: { ProjectId: id }}, {new: true})
      })
      .then(store => {
        res.status(200).json({ store })
      })
      .catch(next)
  }
}