const productModel = require('../models/product')

module.exports = {
    create(req,res,next){
        let userId = req.loggedUser.id
        const { name, price, description, imgUrl, quantities } = req.body
        const formProduct = { name, price, description, imgUrl, userId, quantities }
        productModel.create(formProduct)
            .then(product=>{
                res.status(201).json(product)
            })
            .catch(next)
    },
    findAll(req,res,next){
        productModel.find()
            .populate('userId')
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(next)
    },
    findMyAll(req,res,next){
        productModel.find({ userId : req.loggedUser.id })
            .populate('userId')
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(next)
    },
    updateAll(req,res,next){
        const { name, price, description, imgUrl, quantities } = req.body
        const formProduct = { name, price, description, quantities }
        productModel.findOneAndUpdate({ _id : req.params.id }, formProduct ,{ new : true })
            .then(products=>{
                return productModel.findOneAndUpdate({ _id : req.params.id }, {$set : { imgUrl : [] } })
            })
            .then(newProduct=>{
                return productModel.findOneAndUpdate({ _id : req.params.id }, {$set : { imgUrl }}, { new : true })
            })
            .then(resultProduct=>{
                res.status(200).json(resultProduct)
            })
            .catch(next)
    },
    delete(req,res,next){
        const { id } = req.params
        productModel.findByIdAndDelete({ _id : id })
            .then(product=>{
                res.status(200).json(product)
            })
            .catch(next)
    },
    updateQty(req,res,next){
        const { id } = req.params
        const { quantities } = req.body
        const formProduct = { quantities }
        productModel.findOneAndUpdate({ _id : id }, formProduct ,{ new : true })
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(next)
    }
}