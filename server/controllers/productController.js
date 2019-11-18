const Product = require('../models/product')


class productController{
    static showAll(req,res,next){
        
        Product.find()
        .then(products => {
            console.log('dari product')
            res.status(200).json(products)
        })
        .catch(next)
    }
    static findOne(req,res,next){
        Product.find({
            _id : req.params.id
        })
        .then(one => {
            res.status(200).json(one)
        })
        .catch(next)
    }

    static create(req,res,next){
        // console.log('test')
        Product.create({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            stock : req.body.stock,
            images : req.body.images
        }) 
        .then(product => {
            res.status(201).json({product})
        })
        .catch(next)
    }

    static delete(req,res,next){
        Product.findByIdAndDelete(req.params.id)
        .then(product => {
            res.status(200).json({message : `product :${product.name} successfully deleted`})
        })
        .catch(next)
    }

    static update(req,res,next){
        const {name,description,price,images,stock} = req.body
        
        if(!name || !description || !price || !stock || !images){
            throw {
                status : 400,
                message : 'name, description, price,cand stock cannot be blank'
            }
        }
        Product.findOneAndUpdate({_id : req.params.id}, {name,description,price,images,stock}, { new : true})
        .then(product => {
            console.log('success update =>>>>>>>>>>>',product);
            
            res.status(200).json({message : `product :${name} successfully updated`})
        })
        .catch(next)
    }
}


module.exports = productController