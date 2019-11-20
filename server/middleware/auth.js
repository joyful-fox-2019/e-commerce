const jwt = require('../helpers/jwt');
const Item = require('../models/item');
const User = require('../models/user');

function authentication(req, res, next) {
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded;
        next()
    } catch (err) {
        next(err);
    }
};

function authorization(req, res, next) {
    Item.findById(req.params.id)
        .then(Item => {
            if (Item) {
                if (Item.author == req.decoded.id) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized user'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'article is not found!'
                })
            }
        })
        .catch(next);
};

function authorizationRole(req, res, next) {
    // console.log(req.headers.role)
    if (req.headers.role === 'admin') {
        next()
    } else {
        res.status(401).json({
            message: 'Just Admin Can Create!'
        })
    }
}

module.exports = {
    authentication,
    authorization,
    authorizationRole
}