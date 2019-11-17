const Product = require("../models/ProductModel");
const User = require('../models/UserModel')

async function checkStorage(req, res, next) {
  try {
    let _id = req.loggedUser._id
    const user = await User.findOne({_id},'cart')
    let rejectProduct = []
    let getProduct = []
    for (let productInCart of user.cart) {
      const product = await Product.findOne({_id:productInCart.product})
      if (product.stock >= productInCart.qty){
        getProduct.push({productId:product._id, productName: product.name, qty : productInCart.qty})
      } else {
        rejectProduct.push({productId:product._id, productName: product.name, qty : productInCart.qty})
      }
    }
   if(rejectProduct.length < 1){
     next()
   } else {
     next({status : 400, message : {text : 'Some product is empty, please remove some product', products : {rejectProduct,getProduct} }})
   }
  } catch (error) {
    next(error)
  }
}


module.exports = checkStorage
