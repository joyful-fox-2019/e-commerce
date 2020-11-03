const {
    verifyToken
} = require('../helpers/jsonwebtoken')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        req.decoded = verifyToken(req.headers.token)
        next()
    } catch (err) {
        throw '403'
    }
}