const User = require('../models/user')
const comparePassword = require('../helpers/passwordEncryptor').comparePassword
const generateToken = require('../helpers/tokenMaker').generateToken

class UserController {
    static register(req, res, next) {
        let objUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(objUser)
            .then(result => {
                let payload = {
                    id: result._id,
                    username: result.username,
                    email: result.email,
                    role: result.role
                }
                let token = generateToken(payload)
                res.status(201).json({ token })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        if(!email || !password) {
            res.status(400).json({ message: 'bad request' })
        } else {
            const invalidLoginError = {
                status: 404,
                message: 'Invalid Email or Password'
            }
            User.findOne({ email })
                .then(user => {
                    if(user && comparePassword(password, user.password)) {
                        let payload = {
                            id: user._id,
                            email: user.email,
                            role: user.role
                        }
                        let token = generateToken(payload)
                        let userData = {
                            token: token,
                            role: user.role
                        }
                        res.status(200).json(userData)
                    } else {
                        next(invalidLoginError)
                    }
                })
                .catch(next)
        }
    }

    static addToCart(req, res, next) {
        let { product_id, product_name, product_price, product_image, quantity } = req.body
        let user_id = req.loggedUser.id
        let newItem = {
            product_id,
            product_name,
            product_price,
            product_image,
            quantity
        }
        User.updateOne({ _id: user_id }, { $push: { cart: newItem }})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static removeFromCart(req, res, next) {
        const user_id = req.loggedUser.id
        const { cart_id } = req.body
        User.updateOne({ _id: user_id }, { $pull: { cart: { _id: cart_id }}})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static viewCart(req, res, next) {
        const user_id = req.loggedUser.id
        User.findById({ _id: user_id })
            .then(result => {
                res.status(200).json(result.cart)
            })
            .catch(next)
    }
}

module.exports = UserController