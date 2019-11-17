const User = require('../models/user')


module.exports = (req, res, next) => {
    User.findById(req.decoded.id)
        .then(user => {
            if (user.role === 'Admin') {
                next()
            } else {
                throw '403'
            }
        })
        .catch(next)
}