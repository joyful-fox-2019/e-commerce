const User = require('../models/user')
const {comparePassword} = require('../helpers/hash')
const {generateToken} = require('../helpers/jwt')
const Product = require('../models/product')
const Cart = require('../models/cart')

class UserController{

    static register(req,res,next){
        const {username, email, password, role} = req.body
        User.create({username, email, password, role})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(next)
    }

    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({email})
        .then(data=>{
            if(data && comparePassword(password, data.password)){
                let payload = {id : data._id, username : data.username, role : data.role}
                let token = generateToken(payload)
                res.status(200).json({token, payload})
            }else{
                next({
                    status : 401,
                    message : 'Invalid Email/Password'
                })
            }
        })
        .catch(next)
    }

    static ownProducts(req,res,next){
        User.findOne({_id : req.loggedUser.id}).populate('ProductsId')
        .then(data=>{
            res.status(200).json(data.ProductsId)
        })
        .catch(next)
    }

    static profile(req,res,next){
        User.findOne({_id : req.loggedUser.id})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static createProduct(req,res,next){
        let productData
        const {seller, name, description, image, price, stock} = req.body
        Product.create({seller, name, description, image, price, stock})
        .then(data=>{
            productData = data
            return User.findOneAndUpdate({_id:req.loggedUser.id}, {$push : {ProductsId : data._id}})
        })
        .then(_=>{
            res.status(201).json({msg : 'successfully created', data : productData})
        })
        .catch(next)
    }

    static editProduct(req,res,next){
        let productId = req.params.id
        const {name, image, description, price, stock} = req.body
        Product.findOneAndUpdate({_id : productId}, {name, image, price, description, stock}, {runValidators : true, new : true, omitUndefined : true})
        .then(data=>{
            res.status(200).json({msg : 'sucessfully updated', data})
        })
        .catch(next)
    }

    static deleteProduct(req,res,next){
        let productId = req.params.id
        let deletedData
        Product.findOneAndDelete({_id : productId})
        .then(data=>{
            deletedData = data
            return User.findOneAndUpdate({_id : req.loggedUser.id}, {$pull : {ProductsId : productId}})
        })
        .then(_=>{
            return Cart.deleteMany({ProductId : productId})
        })
        .then(_=>{
            res.status(200).json({msg : 'sucessfully deleted', data : deletedData})
        })
        .catch(next)
    }

    static topup(req, res ,next){
        let newBalance
        const {balance} = req.body
        User.findOne({_id:req.loggedUser.id})
        .then(data=>{
            newBalance = data.balance + Number(balance)
            return User.findOneAndUpdate({_id:req.loggedUser.id}, {balance : newBalance}, {new:true})
        })
        .then(data=>{
            res.status(200).json({msg : 'success top up', balance : data.balance})
        })
        .catch(next)
    }
    static upload(req, res){
        res.status(200).json({
            msg: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
          })
    }
}

module.exports = UserController