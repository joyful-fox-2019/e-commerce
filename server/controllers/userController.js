const User = require('../models/user')
const Cart = require('../models/cart')
const verifyPassword = require('../helpers/verifyPassword')
const generateToken = require('../helpers/generateToken')

class userController {
    static getOne(req, res, next) {
        User.findById(req.LoggedUser).populate('cart').populate('transaction')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static register(req, res, next) {
        const registeredData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address
        }
        let payload = {}

        User.create(registeredData)
            .then(user => {
                const data = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address
                }

                payload = data
                const createdCart = {
                    user: user._id
                }
                return Cart.create(createdCart)       
            })
            .then(cart => {
                const token = generateToken(payload)
                res.status(201).json({
                    token, msg: 'Successfully Registered'
                })
            })   
            .catch(next)
    }

    static login(req, res, next) {
        if(!req.body.email || !req.body.password) {
            next({
                status: 400,
                msg: 'Bad Request'
            })
        } else {
            User.findOne({
                email: req.body.email
            })
                .then(user => {
                    const passwordIsTrue = verifyPassword(req.body.password, user.password)

                    if (passwordIsTrue) {
                        const userData = {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }

                        const token = generateToken(userData)

                        res.status(200).json({
                            token, msg: 'Logged in'
                        })
                    } else {
                        throw {
                            status: 401,
                            msg: 'Wrong email/password'
                        }
                    }
                })
                .catch(next)
        }

       
    }
}

module.exports = userController