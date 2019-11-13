const Product = require("../models/product.js");

function authorization (req, res, next) {
    Product.findById(req.params.id)
    .then((found) => {
        if (found) {
            if (found.UserId == req.user._id){
                next();
            }
            else {
                let err = { status: 401, message: `You are not authorized` }
                next(err);
            }
        }
        else {
            let err = { status: 404, message: `Product not found` }
            next(err);
        }
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = authorization;