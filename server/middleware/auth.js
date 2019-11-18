const jwt = require('../helpers/jwt');
const Product = require('../models/product');

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
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                if (product.author == req.decoded.id) {
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

module.exports = {
    authentication,
    authorization
}