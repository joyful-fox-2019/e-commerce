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
    const url = req.file.cloudStoragePublicUrl;
    const id = req.loggedUser.id
    let storeId,
      tempProduct
    User.findById(id)
      .then(user => {
        if(!user.StoreId) return 
        else {
          storeId = user.StoreId
          return Product.create({ name, description, price, stock, StoreId: user.StoreId, category, product_image: url })
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
        return Store.findByIdAndUpdate(tempStoreId, {$pull: { ProductId: id }}, {new: true})
      })
      .then(store => {
        res.status(200).json({ store })
      })
      .catch(next)
  },
  findAllCategory (req, res, next) {
    let tempCategory = []
    Product.find()
      .then(products => {
        products.forEach((el, i) => {
          el.category.forEach((category, i) => {
            tempCategory.push(category)
          })
        })
        res.status(200).json({categories: tempCategory})
      })
      .catch(next)
  },
  findByCategoryName (req, res, next) {
    const name = req.params.name;
    Product.find().populate('StoreId')
      .then(products => {
        let tempProduct = []
        products.forEach((product, i) => {
          product.category.forEach((el, i) => {
            if(el == name)  tempProduct.push(product)
          })
        })
        if(tempProduct.length == 0) next({status:404, msg: 'not found!'})
        else {
          res.status(200).json({products: tempProduct})
        }
      })
      .catch(next)
  }
}