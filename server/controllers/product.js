const Product = require('../models/product')
const getObjUpdate = require('../helpers/getObjUpdate')
const keySearch = require('../helpers/keySearch')
const gcsDelete = require('../helpers/gscDeleteFile')

class ProductController {
  static addProduct(req, res, next) {
    if (!req.file) next({ status: 400, msg: "Image for this product is required!" })
    let { name, description, price, stock, category } = req.body
    let imgUrl = req.file.cloudStoragePublicUrl

    Product.create({
      name,
      description,
      category,
      price,
      stock,
      imgUrl
    })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Product.findById({ _id: id })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static searchProduct(req, res, next) {
    let key = keySearch(req.query)
    Product.find(key)
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static editProduct(req, res, next) {
    let productId = req.params.id
    let dataUpdate = getObjUpdate(req.body)
    Product.findByIdAndUpdate(productId, {$set: dataUpdate}, { runValidators: true, new: true })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Product.findById(id)
      .then(result => {
        gcsDelete(result.imgUrl)
        return Product.findByIdAndDelete(id)
      })
      .then(() => {
        res.status(200).json("Deleted product success!")
      })
      .catch(next);
  }
}

module.exports = ProductController