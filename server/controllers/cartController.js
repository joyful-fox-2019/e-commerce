const User = require('../models/user')
const Product = require('../models/product')

class CartController {

  static async getCart (req,res,next) {
    const { _id } = req.loggedUser
    try{
      const cartData = await User.findOne({ _id }).populate('cart.ProductId')
      res.status(200).json(cartData.cart)
    }
    catch(err){
      next(err)
    }
  }

  static async addToCart (req,res,next) {
    const { _id } = req.loggedUser
    const { ProductId } = req.params
    let foundSame = false
    try{
      const cartData = await User.findOne({ _id })
      cartData.cart.forEach((data) => {
        if(data.ProductId == ProductId){
          foundSame = true
        }
      })
      if(foundSame){
        res.status(400).json({ message:"This item already in your cart!" })
      }
      else{
        let productData = await Product.findOne({ _id:ProductId })
        if(productData){
          let obj = {
            ProductId,
            amount: 1,
            ProductName: productData.name,
            ProductPrice: productData.price
          }
          const userData = await User.updateOne({ _id },{
            $push: { cart : obj }
          })
          res.status(200).json({ message:"Succesfuly added to cart!" })
        }
        else{
          throw { status:404,message:'Product not found' }
        }
      }
    }
    catch(err){
      next(err)
    }
  }

  static async updateAmount (req,res,next) {
    const { _id } = req.loggedUser
    const { ProductId,amount } = req.params
    try{
      const userData = await User.updateOne({ _id, 'cart.ProductId':ProductId },{
        $set: { 'cart.$.amount' : amount }
      })
      res.status(200).json(userData)
    }
    catch(err){
      next(err)
    }
  }

  static async deleteProductFromCart (req,res,next) {
    const { _id } = req.loggedUser
    const { CartId } = req.params
    try{
      const deleteCartData = await User.updateOne({ _id }, {
        $pull: { cart: { _id:CartId   }}
      })
      res.status(200).json({ message:"Successfuly delete cart", deleteCartData })
    }
    catch(err){
      next(err)
    }
  }

}

module.exports = CartController