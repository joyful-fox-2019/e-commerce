const Product = require("../models/product");
const { Schema } = require("mongoose");

module.exports = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    })
        .then(product => {
            if (product.seller != req.user.id) {
                res.status(401).json({ msg: "no authorization" })
            }
            else {
                next();
            }
        })
        .catch(err => {
            next(err);
        })
}