const Product = require('../models/Product')

class ProductController{
  static getProduct(req, res, next){
    Product.find()
    .populate('user_id')
    .sort({createdAt:'desc'})
      .then(products=>{
        res.status(200).json(products)
      })
      .catch(next)
  }

  static getProductPagination(req, res, next){
    const {page} = req.params
    const perPage = req.query.num || 10
    const getPage = (page - 1) * perPage
    Product.find()
    .populate('user_id')
    .skip(getPage)
    .limit(perPage)
    .sort({createdAt:'desc'})
      .then(products=>{
        res.status(200).json(products)
      })
      .catch(next)
  }

  static getOne(req, res, next){
    const _id = req.params.id
    Product.findOne({_id})
    .populate('user_id')
      .then(product=>{
        res.status(200).json(product)
      })
      .catch(next)
  }

  static search(req, res, next){
    const {search} = req.body
    const page = req.query.page || 1
    const num = req.query.num || 10
    const getPage = (page - 1) * num
    Product.find({
      name: {$regex: search}
    })
    .populate('user_id')
    .skip(getPage)
    .limit(num)
    .sort({createdAt:'desc'})
      .then(products=>{
        res.status(200).json(products)
      })
      .catch(next)
  }

  static createProduct(req, res, next){
    const {name, description, stock, price, file} = req.body
    Product.create({
      name,
      description,
      stock,
      price,
      image: file
    })
      .then(product=>{
        res.status(201).json(product)
      })
      .catch(next)
  }

  static deleteOne(req, res, next){
    const _id = req.params.id
    Product.deleteOne({_id})
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }

  static editOne(req, res, next){
    const _id = req.params.id
    const {name, description, stock, price} = req.body
    Product.updateOne({_id}, {
      name,
      description,
      stock,
      price
    })
      .then(num=>{
        res.status(201).json(num)
      })
      .catch(next)
  }
}

module.exports = ProductController