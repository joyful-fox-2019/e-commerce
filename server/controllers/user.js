const User = require('../models/user'),
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
        User.findOne({
            email: email
        })
            .populate('cart', 'cart.product')
            .then(user => {
                if (!user) {
                    next({ status: 403, message: 'Invalid password or email' })
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
                        next({ status: 403, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }

    static findLoggedIn(req, res, next) {
        User.findById(req.loggedUser.id).populate('cart cart.product')
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }
}

module.exports = UserController