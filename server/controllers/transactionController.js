const Transaction = require('../models/transactions')
const Product = require('../models/product')
const User = require('../models/user')

class TransactionController {

  static async allDataTransaction (req,res,next) {
    try{
      const data = await Transaction.find().populate('product.ProductId')
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async getUserTransaction (req,res,next) {
    try{
      const data = await Transaction.find({ UserId: req.loggedUser._id }).populate('product.ProductId')
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async createTransaction (req,res,next) {
    const { _id } = req.loggedUser
    // const { ProductId, name, price, amount, total } = req.body 
    try{
      
      const userCartData = await User.findOne({ _id }).populate('cart.ProductId')
      var totalPrice = 0

      // userCartData.cart.forEach(async (cartData) => {
      //   totalPrice = totalPrice + (cartData.ProductId.price * cartData.amount)
      //   const productData = await Product.updateOne({ _id:cartData.ProductId._id },{
      //     qty: cartData.ProductId.qty - cartData.amount
      //   })
      // })
      
      if(userCartData.cart.length !== 0){
        let emptyConfirmation = []
        for(let i = 0; i < userCartData.cart.length; i++){
          if(userCartData.cart[i].ProductId.qty <= 0){
            emptyConfirmation.push(`We don't have any stock of '${userCartData.cart[i].ProductId.name}' left. Will restock soon`)
          }
          else if(userCartData.cart[i].amount > userCartData.cart[i].ProductId.qty){
            emptyConfirmation.push(`Sorry, we only have ${userCartData.cart[i].ProductId.qty} '${userCartData.cart[i].ProductId.name}' left`)
          }
        }
  
        if(emptyConfirmation.length === 0){
          for(let i = 0; i < userCartData.cart.length; i++){
            totalPrice = totalPrice + (userCartData.cart[i].ProductId.price * userCartData.cart[i].amount)
            const productData = await Product.updateOne({ _id:userCartData.cart[i].ProductId._id },{
              qty: userCartData.cart[i].ProductId.qty - userCartData.cart[i].amount
            })
          }

          const dataTransaction = await Transaction.create({
            UserId: _id,
            product: userCartData.cart,
            total: totalPrice
          })
    
          await User.updateOne({ _id }, { cart:[] })
    
          res.status(201).json(dataTransaction)
          // res.status(201).json("ok")
        }
        else{
          throw { status:400,message:emptyConfirmation }
        }
      }
      else{
        throw { status:400,message:"Cart is empty" }
      }
    }
    catch(err){
      next(err)
    }
  }

  static async statusChange (req,res,next) {
    const { _id } = req.params //Transaction id
    try{
      const data = await Transaction.updateOne({ _id }, { status:true })
      res.status(200).json({ message: "Successfuly confirmed" })
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = TransactionController