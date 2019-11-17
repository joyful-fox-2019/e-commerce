const { decodeToken } = require('../helpers/jwt')
const Product = require('../models/product')
const User = require('../models/user')

const authentication = (req, res, next) => {
    try {
        req.loggedUser = decodeToken(req.headers.token)
        User.findOne({
            email: req.loggedUser.email
        })
            .then(user => {
                if (user) next()
                else throw new Error({ status: 401, message: 'Authentication Failed' })
            })
            .catch(next)
    }
    catch (err) {
        next(err)
    }
}

function adminAuthorization(req, res, next) {
    try {
        if (req.loggedUser.isAdmin !== true) {
            throw new Error({ status: 403, message: `You're not authorize to perform this action` })
        } else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

const authorization = (req, res, next) => {
    let { id } = req.params
    Product.findById(id)
        .then(product => {
            if (product && product._id == id) {
                next()
            } else if (!product) {
                next({ status: 404, message: "product not found" })
            }
        })
        .catch(next)
}

module.exports = {
    authentication, adminAuthorization, authorization
}
