const Product = require('../models/product')
const deletegcs = require('../helpers/deletegcs')

class ProductController {
  static read(req, res, next){
    let condition = {}
    if(req.query.name || req.query.tag){
      condition = {
          $and:[]
      }
      if(req.query.name){
          condition.$and.push({'name': new RegExp(`${req.query.name}`, 'gi')})
      }
      if(req.query.tag){
          condition.$and.push({'tags': new RegExp(`${req.query.tag}`, 'gi')})
      }
    }
    Product.find(condition)
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static create(req, res, next){
    let {name, description, price, stock, tags, imgUrl} = req.body
    let image = imgUrl
    Product.create({
      name,
      description,
      price,
      stock,
      tags,
      image
    })
      .then(data => {
          res.status(201).json(data)
      })
      .catch(err => {
        image.forEach(foto => {
          deletegcs(foto)          
        })
        next(err)
      })
  }
  static readOne(req, res, next){
    Product.findById(req.params.id)
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          next({status:404, message:'Product Not Found'})
        }
      })
      .catch(next)
  }
  static update(req, res, next){
    let {name, description, price, stock, tags, remove, imgUrl} = req.body
    let { id } = req.params
    let image = []

    Product.findById(id)
      .then(result => {
        if(result){
          
          if(remove){
            result.image.forEach(img => {
              if(remove.indexOf(img) == -1){
                image.push(img)
              }
            })
            let removeArray = []
            if(typeof remove == 'string'){
                removeArray.push(remove)
            }
            else{
                removeArray = remove
            }
            removeArray.forEach(foto => {
              deletegcs(foto)
            });
          }

          imgUrl.forEach(img => {
            image.push(img)
          })
          
          return Product.findByIdAndUpdate({_id:req.params.id},
            {
              name,
              description,
              price,
              stock,
              tags,
              image
            }, { runValidators: true }
          )
        }
        else{
            throw({status: 404, message:"Product not Found"})
        }
      })
      .then(data => {
          res.status(200).json({_id:id, name, description, price, stock, tags, image})
      })
      .catch(err => {
        imgUrl.forEach(foto => {
          deletegcs(foto)          
        })
        next(err)
      })
  }
  static delete(req, res, next){
    let { id } = req.params
    Product.findById(id)
      .then(result => {
        if(result){
          result.image.forEach(foto => {
            deletegcs(foto)
          });
          return Product.findByIdAndDelete(id)
        }
        else{
          throw({status: 404, message:"Product not Found"})
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController