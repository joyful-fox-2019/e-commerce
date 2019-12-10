const Product = require('../models/product');
const User = require('../models/user');

class ProductController {
    static updateProduct(req, res, next){
        Product.findOneAndUpdate({
            _id: req.params.id
        },{
            title: req.body.title,
            description: req.body.description,
            image: req.body.file,
            price: req.body.price,
            stock: req.body.stock,
            genre: req.body.genre
        })
        .then(product=>{
            res.status(200).json({message: 'product updated'})
        })
        .catch(next)
    }
    
    static addProduct (req, res, next){
        Product.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.file,
            price: req.body.price,
            seller: req.user.id,
            status: 'OK',
            stock: req.body.stock,
            genre: req.body.genre
        })
        .then(product=>{
            res.status(201).json({message: 'product added'})
        })
        .catch(next)
    }

    static getAllProduct (req, res, next){
        Product.find()
        .then(products=>{
            res.status(200).json(products);
        })
        .catch(next)
    }

    static getMyProduct (req, res, next){
        Product.find({
            seller: req.user.id
        })
        .then(products=>{
            res.status(200).json(products);
        })
        .catch(next)
    }

    static getOneProduct (req, res, next){
        Product.findOne({
            _id: req.params.id
        })
        .then(product=>{
            res.status(200).json(product);
        })
        .catch(next)
    }

    static deleteProduct (req, res, next){
        Product.findOneAndDelete({
            _id: req.params.id
        })
        .then(product=>{
            res.status(200).json(product);
        })
        .catch(next)
    }

}

module.exports = ProductController;