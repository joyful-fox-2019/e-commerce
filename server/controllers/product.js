const Product = require('../models/product')
const { Storage } = require('@google-cloud/storage')
const { ObjectId } = require('mongoose').Types

class ProductController {
  static create (req,res, next) {
    const { name, price, image, stock } = req.body
    Product.create({ name, price, image, stock})
      .then(product => {
        res.status(201).json({ product, message: 'Successfully created product'})
      })
      .catch(next)
  }
  static findAll (req, res, next) {
    const { keyword, sort, whose } = req.query
    let objParams = {}
    let sortParams = { createdAt: -1 }
    if (sort === 'popular') sortParams = [[ 'likes', 'desc']]
    if (sort === 'sold') sortParams = [['sold', 'desc']]
    if (sort === 'cheapest') sortParams = [['price', 'asc']]
    if (sort === 'expensive') sortParams = [['price', 'desc']]
    if (keyword) { objParams.name = { $regex: keyword, $options: 'i' }}
    if(whose === 'mine') objParams.favourites = req.loggedUser.id
    
    Product.find(objParams).sort(sortParams)
      .populate('favourites')
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const { id } = req.params
    Product.findById(id)
      .populate('favourites')
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static update (req, res, next) {
    const { name, price, image, stock } = req.body
    console.log(req.body);
    const { id } = req.params
    Product.findById(id).populate('favourites')
      .then(product => {
        if(image && image !== product.image){
          const bucket = process.env.BUCKET_NAME
          const storage = new Storage({
            keyFilename: process.env.KEYFILE_PATH,
            projectId: process.env.PROJECT_ID
          })
          let picture = product.image
          let filename = picture.replace(/(https:\/\/storage.googleapis.com\/bikelah-image\/)/, '')
          storage.bucket(bucket).file(filename).delete()
          product.image = image
        }
        product.name = name
        product.price = price
        product.stock = stock
        return product.save()
      })
      .then(product => {
        res.status(200).json({ message: `Successfully updated product`, product})
      })
      .catch(next)
  }
  static getMyFav (req, res, next) {
    const { id } = req.loggedUser
    Product.find({ favourites: id }).populate('favourites')
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }
  static favorite (req, res, next) {
    const { id } = req.params
    const userId = req.loggedUser.id
    let likes = null
    Product.findOne({ _id: id , favourites: userId })
      .then(product => {
        if(product) {
          return Product.findOneAndUpdate({ _id: id }, { $pull: { favourites: ObjectId(userId) }})
            .then(product => {
              likes = product.likes - 1
              return Product.findByIdAndUpdate(id, { likes }).populate('favourites')
              .then(product => {
                res.status(200).json({ product, message: 'Successfully remove from your favorite'})
              })
            })
        } else {
          return Product.findOneAndUpdate({ _id: id }, { $push: { favourites: ObjectId(userId) }})
            .then(product=> {
              likes = product.likes + 1
              return Product.findByIdAndUpdate(id, { likes }).populate('favourites')
              .then(product => {
                res.status(200).json({ product, message: 'Successfully add to your favorite'})
              })
            })
        }
      })
      .catch(next)
  }
  static remove (req, res, next) {
    const { id } = req.params
    Product.findByIdAndRemove(id)
      .then(product => {
        const bucket = process.env.BUCKET_NAME
          const storage = new Storage({
            keyFilename: process.env.KEYFILE_PATH,
            projectId: process.env.PROJECT_ID
          })
          let picture = product.image
          let filename = picture.replace(/(https:\/\/storage.googleapis.com\/bikelah-image\/)/, '')
          storage.bucket(bucket).file(filename).delete()

          res.status(200).json({ message: 'Successfully deleted product'})
      })
      .catch(next)
  }
}

module.exports = ProductController