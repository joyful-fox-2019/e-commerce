const Product = require('../models/ProductModel')
const removeGCS = require('../helpers/deleteCS')
const User = require('../models/UserModel')

class ProductController{

  static async add(req,res,next){
    try {
      let image
      if(req.file){
        image = req.file.cloudStoragePublicUrl
      } else {
        image = ''
      }
      let {name,price,stock,detail} = req.body
      console.log(req.body);
      const created = await Product.create({name,price,stock,detail,image})
      res.status(201).json(created)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let { productId } = req.params
      let arr = ['name','price','stock','detail']
      let fields = req.body
      let obj = {}
      arr.forEach((el)=>{
        for (let key in fields){
          if(key === el){
            obj[key] = fields[key]
          }
        }
      })
      if(req.file){
        console.log('masuk req file -------------------->>>>>>000');
        let image = req.file.cloudStoragePublicUrl
        obj.image = image
        const updated = await Product.updateOne({_id:productId},obj,{runValidators:true})
        let message = 'Product updated!'
        res.status(201).json({message,updated})
      } else {
        console.log('masuk else -------------------->>>>>>000');
        let image = await Product.findOne({_id:productId}).select('image')
        obj.image = image.image
        const updated = await Product.updateOne({_id:productId},obj,{runValidators:true})
        let message = 'Product updated!'
        res.status(201).json({message,updated})
      }
    } catch (error) {
     next(error) 
    }
  }

  static async remove(req,res,next){
    try {
      let {productId} = req.params
      const product = await Product.findOne({_id:productId}).select('image')
      if(product.image !== 'https://imageog.flaticon.com/icons/png/512/36/36601.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'){
        let delGCS = await removeGCS(product.image)
      }
      const users = await User.find().select('cart')
      for (let user of users ){
        for (let cart of user.cart){
          if (cart.product == productId){
            const updateUser = await User.updateOne({_id:user._id},{$pull:{cart:{product:productId}}})
          }
        }
      }
      const deleted = await Product.deleteOne({_id:productId})
      let message = 'Product deleted'
      res.status(200).json({message,deleted})
    } catch (error) {
      next(error)
    }
  }

  static async findAll(req,res,next){
    try {
      const products = await Product.find()
      res.status(200).json({products})
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let {productId} = req.params
      const product = await Product.findOne({_id:productId})
      res.status(200).json({product})
    } catch (error) {
      next(error)
    }
  }

  static async addToFav(req,res,next){
    try {
      let { productId } = req.params
      let userId = req.loggedUser._id
      const findWishlist = await User.findOne({_id:userId}).select('wishlist')
      if (findWishlist.wishlist.length < 1){
        const addWishlist = await User.updateOne({_id:userId},{$push : {wishlist : productId}})
        res.status(200).json(addWishlist)
      } else {
        let flag = false
        for(let i = 0; i < findWishlist.wishlist.length; i++){
          if(findWishlist.wishlist[i] == productId){
            flag = false
            next({status:409,message : 'You\'ve already add this product to your wishlist'})
            break;
          } else {
            flag = true
          }
        }
        if(flag){
          console.log('masuk dua');
          const addWishlist = await User.updateOne({_id:userId},{$push : {wishlist : productId}})
          res.status(200).json(addWishlist)
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async removeFav(req,res,next){
    try {
      let { productId } = req.params
      let userId = req.loggedUser._id
      const removeWishList = await User.updateOne({_id:userId},{$pull : {wishlist : productId}})
      res.status(200).json(removeWishList)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = ProductController