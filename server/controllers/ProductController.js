const Product = require('../models/Product')

class ProductController {

    static create(req, res, next){
        const userId = req.decode.id
        const { name, file, desc, price, stock, review } = req.body
        Product.create({ userId, name, image: file, desc, price, stock, review })
            .then(product =>{
                res.status(201).json(product)
            })
            .catch(next)
    }

    static find(req, res, next){
        Product.find().sort({ updatedAt: -1 })
            .then(products =>{
                res.status(200).json(products)
            })
            .catch(next)
    }

    static findOne(req, res, next){
        const { id } = req.params
        Product.findById(id)
            .then(product =>{
                product ? res.status(200).json(product) : next({ status: 404, msg: 'Product not found' })
            })
            .catch(next)
    }

    static update(req, res, next){
        const { id } = req.params
        const { name, file, desc, price, stock } = req.body
        let param = { name, desc, price, stock }
        if(file) param = { name, image: file, desc, price, stock  }
        Product.findByIdAndUpdate(id, param, { omitUndefined: true })
            .then(product =>{
                res.status(200).json(product)
            })
            .catch(next)
    }

    static delete(req, res, next){
        const { id } = req.params
        Product.findByIdAndDelete(id)
            .then(product =>{
                res.status(200).json(product)
            })
            .catch(next)
    }

    static findSellerProduct(req ,res, next){
        const userId = req.decode.id
        Product.find({ userId }).sort({ updatedAt: -1 })
            .then(products =>{
                res.status(200).json(products)
            })
            .catch(next)
    }

    static search(req, res, next) {
        const { keyword } = req.query
        const parameter = 
        {
            $or: [
                {
                    name: {
                        $regex: `${keyword}`, $options: 'i'
                    }
                },
                {
                    desc: {
                        $regex: `${keyword}`, $options: 'i'
                    }
                }
            ],
        }
        Product.find(parameter).populate('userId', 'email').sort({ updatedAt: -1 })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

}

module.exports = ProductController