const { User } = require('../models'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt'),
    { OAuth2Client } = require('google-auth-library');

class UserController {

    static register(req, res, next) {
        let { username, email, password, isAdmin } = req.body
        User.create({ username, email, password, isAdmin })
            .then(newUser => {
                res.status(201).json({ message: 'successful register', newUser })
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        // console.log(req.body, 'asdasa');
        User.findOne({
            email: email
        })
            .populate('cart cart.product')
            .then(user => {
                if (!user) {
                    next({ status: 400, message: 'Invalid password or email' })
                } else {
                    let authPass = compare(password, user.password)
                    if (authPass) {
                        let payload = {
                            username: user.username,
                            email: user.email,
                            cart: user.cart,
                            id: user._id,
                            isAdmin: user.isAdmin
                        }
                        let token = generateToken(payload)
                        res.status(200).json({ token, user: payload })
                    } else {
                        next({ status: 400, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }


    static addToCart(req, res, next) {
        let { product_id, product_name, product_price, product_stock, product_image, quantity } = req.body
        let user_id = req.loggedUser.id
        let newItem = {
            product_id,
            product_name,
            product_price,
            product_stock,
            product_image,
            quantity
        }
        // console.log(newItem);
        User.updateOne({ _id: user_id }, { $push: { cart: newItem } })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static removeFromCart(req, res, next) {
        // console.log(`ahbsbsbskkbsj`);
        const user_id = req.loggedUser.id
        const id = req.params.id
        User.updateOne({ _id: user_id }, { $pull: { cart: { _id: id } } })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static viewCart(req, res, next) {
        const user_id = req.loggedUser.id
        User.findById({ _id: user_id })
            .then(user => {
                res.status(200).json(user.cart)
            })
            .catch(next)
    }

}

module.exports = UserController