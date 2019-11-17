'use strict'
const { verifyToken } = require('../helpers/jwt') // ini dugunaka buat men-decoded token
const User = require('../models/user')
const Product = require('../models/product')

module.exports = {
    authenticate : (req, res, next) => {
        console.log('masuk authenticate')
        console.log(req.body)
        try {    
            // masukkan data yang telah diencoded
            const user = verifyToken(req.headers.token)            
            User.findOne({
                _id : user.id // cari apakah data dia ada di server
            })
            .then (user => {
                if (user) {
                    console.log(user, 'user find')
                    req.user = user // kalo ada maka simpan user di req.user
                    next()
                } else {
                    next({
                        name : 'DataError' //kalau tidak ada maka harus login lagi
                    })
                }
                
            })     
            
        } catch(err) {  
            next(err)    
        }
    },
    authorize : (req, res, next) => {
        console.log('masuk authorize')
        Product
            .findById(req.params.id)
            .then(product => {
                if (product) {   
                    console.log(product )     
                    console.log(req.user._id)            
                    if (String(product.user) == req.user._id) {
                        console.log(product)
                        next()
                    } else {
                        next({
                            status : 401,
                            msg : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        msg : 'data not found'
                    })
                }
            })
            .catch(next)
    }        
        
} 