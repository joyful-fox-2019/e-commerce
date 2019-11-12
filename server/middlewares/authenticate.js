const jwt = require('../helpers/tokenHandler')
const User = require('../models/user')

function authenticate(req, res, next) {
    try {
        let decoded = jwt.verifyToken(req.headers.access_token)
        User.findOne({
                _id: decoded.id
            })
            .then(user => {
                req.user = decoded
                next()
            })
            .catch(err => {
                next({
                    code: 404,
                    message: 'You must login first'
                })
            })
    } catch (err) {
        next(err)
    }
}

module.exports = authenticate