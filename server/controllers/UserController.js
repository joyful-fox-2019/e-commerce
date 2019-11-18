const User = require("../models/user");
const jwt = require("../helpers/jwt.js");
const bcryptjs = require("../helpers/bcryptjs.js");

class UserController {
    static adminRegister(req, res, next) {
        console.log(req.body)
        let body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.adminPassword,
        }
        if(req.body.adminPassword) {
            if(req.body.admin_password === process.env.ADMIN_PASSWORD){
                req.body.role = "admin";
            } else {
                next(new Error("Incorrect password for register as admin"))
            }
        }
        User.create(body)
            .then(( result ) => {
                let token = jwt.createToken({
                    _id: result._id,
                    email: result.email
                })
                res.status(201).json(composeReturn(token,result))
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static login(req, res, next) {
        User.findOne({email: req.body.email})
        .then(( result ) => {
            if(!result){
                throw new Error("Email is Invalid!")
            } else {
                let token = jwt.createToken({
                    _id: result._id,
                    email: result.email
                })
                if(bcryptjs.validatePassword(req.body.password,result.password)){
                    res.status(200).json(composeReturn(token,result))
                }else{
                    throw new Error("Password is Invalid!")
                }
            }
        })
        .catch(( err ) => {
            next(err);
        })
    }
    static register(req, res, next){
        console.log(req.body)
        let body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            balance:0
        }
        if(req.body.admin_password) {
            if(req.body.admin_password === process.env.ADMIN_PASSWORD){
                body.role = "admin";
            } else {
                next(new Error("Incorrect password for register as admin"))
            }
        }
        User.create(body)
            .then(( result ) => {
                let token = jwt.createToken({
                    _id: result._id,
                    email: result.email
                })
                res.status(201).json(composeReturn(token,result))
            })
            .catch(( err ) => {
                next(err)
            })
    }
    static logout(req,res,next){
        res.status(200).json({
            message: "Successfully logout",
            accountType: req.body.user.accountType
        })
    }
    static getUser(req, res, next){
        let user ={}
        try {
            user = {
                accountType:req.body.user.accountType,
                imageUrl:req.body.user.imageUrl,
                name: req.body.user.name,
                role: req.body.user.role,
                balance: req.body.user.balance
            }
        }
        catch(err){
            next(err)
        }
        res.status(200).json(user)
    }
    static update(req,res,next){
       
            let updateVal = {};
            req.file && (updateVal.imageUrl = req.file.cloudStoragePublicUrl) 
            req.body.balance && (updateVal.balance = req.body.balance);

            User.findByIdAndUpdate(req.params.user._id,updateVal,{new:true})
                .then(( result ) => {
                    res.status(200).json(result);
                })
                .catch(( err ) => {
                    next(err)
                })
    }
}

function composeReturn(token, result) {
    return {
        token:token,
        name: result.name,
        imageUrl: result.imageUrl,
        role: result.role,
        balance: result.balance
    }
}
module.exports = UserController;