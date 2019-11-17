const Product = require('../models/product')
const gcsDelete = require('../helpers/gcsdelete')

class ProductController{
  static create(req, res, next){
    const { name, price, stock } = req.body
    const img = req.file.cloudStoragePublicUrl
    Product.create({ name, price, stock, img })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static delete(req, res, next){
    const { id } = req.params
    Product.findById(id)
      .then(result => {
        gcsDelete(result.img)
        return Product.findByIdAndRemove( id )
      })
      .then( result => {
        res.status(200).json({ message: 'Product was Deleted'})
      })
      .catch(next)
  }

  static findAll(req, res, next){
    Product.find({})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next){
    const fields = [ 'name', 'price', 'stock' ]
    const { id } = req.params
    const img = req.file.cloudStoragePublicUrl
    let update = {}
      for( let key in req.body ){
        fields.forEach( data => {
          if( key == data ){
            update[ key ] = req.body[ key ]
          } 
      }) 
    }
      update['img'] = img
      Product.findById(id)
        .then(result => {
          gcsDelete(result.img)
          return Product.findByIdAndUpdate(id, update)
        })
        .then( result => {
          res.status(200).json(result)
        })
        .catch( next )
  }

  static search(req, res, next){
    console.log(req.query.q)
    Product.find({
      name: new RegExp(`${req.query.q}`, 'gi'),
    })
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ProductController