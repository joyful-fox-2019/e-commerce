const Product = require("../models/product.js");
const gcsDelete = require("../middlewares/gcsdelete.js");

class ProductController {
    static findAll (req, res, next) {
        Product.find()
        .sort({
            createdAt: "DESC"
        })
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            next(err);
        });
    }
    static findUser (req, res, next) {
        Product.find({
            UserId: req.user._id
        })
        .sort({
            createdAt: "DESC"
        })
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            next(err);
        });
    }
    static findOne (req, res, next) {
        Product.findById(req.params.id)
        .populate("UserId", "-password")
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            err = { status: 404, message: `Product not found` }
            next(err);
        });
    }
    static create (req, res, next) {
        if (req.file) {
            Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                featured_image: req.file.cloudStoragePublicUrl,
                status: true,
                UserId: req.user._id
            })
            .then((product) => {
                res.status(201).json(product);
            })
            .catch((err) => {
                gcsDelete(req.file.cloudStoragePublicUrl);
                next(err);
            });
        } 
        else {
            let err = { status: 400, message: `Feature image is required` }
            next(err);
        }
    }
    static update (req, res, next) {
        Product.findById(req.params.id)
        .then((found) => {
            let updateFields = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                status: req.body.status,
            }
            if (req.file) {
                gcsDelete(found.featured_image);
                updateFields["featured_image"] = req.file.cloudStoragePublicUrl;
            }
            return Product.updateOne({
                        _id: req.params.id,
                        UserId: req.user._id
                    }
                    , { $set : updateFields }
                    , { 
                        omitUndefined: true, 
                        runValidators: true 
                    });
        })
        .then((updated) => {
            res.status(200).json(updated);
        })
        .catch((err) => {
            next(err);
        });
    }
    static delete (req, res, next) {
        Product.findOne({
            _id: req.params.id
        })
        .then((found) => {
            gcsDelete(found.featured_image);
            return Product.deleteOne({
                _id: req.params.id
            });
        })
        .then((deleted) => {
            res.status(200).json(deleted);
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = ProductController;