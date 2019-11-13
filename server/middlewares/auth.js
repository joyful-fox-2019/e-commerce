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
    catch (error) {
        next(error)
    }
}

const authorization = (req, res, next) => {
    if (req.loggedUser.isAdmin) next()
    else {
        next({ status: 403, message: `You're not authorize to perform this action` })
    }
}


module.exports = {
    authentication,
    authorization
}