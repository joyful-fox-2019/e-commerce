const {
    verifyToken
} = require('../helpers/jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        req.decoded = verifyToken(req.headers.token)
        next()
    } catch (err) {
        throw '403'
    }
}