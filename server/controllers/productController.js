const Product = require('../models/product')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const myBucket = storage.bucket('dipaecommerce')

class ProductController {

  static async findAll (req,res,next){
    try{
      const data = await Product.find()
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async findDetail (req,res,next) {
    const { _id } = req.params
    try{
      const data = await Product.findOne({ _id })
      if(data){
        res.status(200).json(data)
      }
      else{
        throw { message:"Data not found",status:404 }
      }
    }
    catch(err){
      next(err)
    }
  }

  static async createProduct (req,res,next) {
    const { name, price, imgUrl, qty } = req.body
    try{
      const data = await Product.create({ name, price, imgUrl, qty })
      res.status(201).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async editProduct (req,res,next) {
    try{
      
      // find product base on product id
      const { _id } = req.params // ProductId
      const dataProduct = await Product.findOne({ _id })
      let deleteImageData
      if(dataProduct){
        console.log( dataProduct, "controller" )
        deleteImageData = dataProduct.imgUrl
      }
      else{
        throw { message:"Data not found",status:404 }
      }
      
      // after get the imgData, if imgUrl same with deleted imgData then skip
      //if notSame, delete the image, and replace with new link
      // PLEASE SEE THE DETAIL IN MINIWP CLIENT TO HANDLE THE CLIENT SIDE
      const { name, price, imgUrl, qty } = req.body
      if(imgUrl && deleteImageData != imgUrl){
        let myfile = deleteImageData.split('/')
        const file = myBucket.file(myfile[4])
        const deleteImgDataInGCS = await file.delete()
      }

      // then VOILA! update!
      const data = await Product.updateOne({ _id }, { name, price, imgUrl, qty })
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static async deleteProduct (req,res,next) {
    const { _id } = req.params
    try{ 
      // find product base on product id
      const { _id } = req.params // ProductId
      const dataProduct = await Product.findOne({ _id })
      if(dataProduct){
        const { imgUrl } = dataProduct
        if(imgUrl){
          //then delete data and image in GCS
          let myfile = imgUrl.split('/')
          const file = myBucket.file(myfile[4])
          const deleteImgDataInGCS = await file.delete()
          const deleteProductData = await Product.deleteOne({ _id })
          res.status(200).json({ deleteProductData,deleteImgDataInGCS })
        }
        else{
          const deleteProductData = await Product.deleteOne({ _id })
          res.status(200).json({ deleteProductData })
        }
      }
      else{
        throw { message:"Data not found",status:404 }
      }
    }
    catch(err){
      next(err)
    }
  }
}

module.exports = ProductController