const Product = require("../models/product.js");
const Cart = require("../models/cart.js");
const Transaction = require("../models/transaction.js");

class CartController {
    static find (req, res, next) {
        Cart.find({
            UserId: req.user._id
        })
        .populate("ProductId")
        .then((carts) => {
            res.status(200).json(carts);
        })
        .catch((err) => {
            next(err);
        });
    }
    static create (req, res, next) {
        Cart.findOne({
            UserId: req.user._id,
            ProductId: req.body.ProductId
        })
        .then((found) => {
            if (found) {
                Cart.updateOne({
                    _id: found._id
                }, { $set: {
                    qty: Number(found.qty) + Number(req.body.qty)
                }},{ 
                    omitUndefined: true, 
                    runValidators: true 
                })
                .then((success) => {
                    res.status(200).json({ message: `Updated qty in cart` });
                })
                .catch((err) => {
                    next(err);
                });
            } else {
                Cart.create({
                    UserId: req.user._id,
                    ProductId: req.body.ProductId,
                    qty: req.body.qty
                })
                .then((success) => {
                    res.status(201).json({ message: `Added to the cart` });
                })
                .catch((err) => {
                    next(err);
                });
            }
        })
        .catch((err) => {
            next(err);
        });
    }
    static update (req, res, next) {
        Cart.findOne({
            ProductId: req.params.id,
            UserId: req.user._id
        })
        .then((found) => {
            if (!found) {
                let err = { status: 404, message: `Product not found in cart` };
                next (err);
            }
            else {
                return Cart.updateOne({
                    ProductId: req.params.id,
                    UserId: req.user._id
                }, { $set : { 
                    qty: req.body.qty 
                }},{ 
                    omitUndefined: true, 
                    runValidators: true 
                });
            }
        })
        .then((updated) => {
            res.status(200).json({ message: `Updated qty in cart` });
        })
        .catch((err) => {
            next(err);
        });
    }
    static delete (req, res, next) {
        Cart.findOne({
            ProductId: req.params.id,
            UserId: req.user._id
        })
        .then((found) => {
            if (!found) {
                let err = { status: 404, message: `Product not found in cart` };
                next (err);
            }
            else {
                return Cart.deleteOne({
                    ProductId: req.params.id,
                    UserId: req.user._id
                });
            }
        })
        .then((deleted) => {
            res.status(200).json({ message: `Removed product from cart` });
        })
        .catch((err) => {
            next(err);
        });
    }
    static checkout (req, res, next) {
        let products = [];
        Cart.find({
            UserId: req.user._id
        })
        .populate("ProductId")
        .then((carts) => {
            if (carts.length === 0) {
                let err = { status: 404, message: `Product not found please add to cart` };
                throw err;
            } else {
                let outStock = [];
                for (let i = 0; i < carts.length; i++) {
                    if (carts[i].qty > carts[i].ProductId.stock) {
                        outStock.push(`Insufficient stock for ${carts[i].ProductId.name}`);
                    } else {
                        products.push({
                            _id: carts[i].ProductId._id,
                            name: carts[i].ProductId.name,
                            price: carts[i].ProductId.price,
                            stock: carts[i].ProductId.stock,
                            qty: carts[i].qty,
                            SellerId: carts[i].ProductId.UserId
                        });
                    }
                }
                if (outStock.length > 0) {
                    let err = { status: 400, message: outStock };
                    throw err;
                } else {
                    return Transaction.create({
                        BuyerId: req.user._id,
                        address: req.body.address,
                        products: products,
                        status: "paid"
                    });
                }
            }
        })
        .then((transaction) => {
            let promises = [];
            for (let i = 0; i < products.length; i++) {
                promises.push(
                    Product.updateOne({
                        _id: products[i]._id
                    }, { $set: {
                        stock: products[i].stock - products[i].qty
                    }}, { 
                        omitUndefined: true, 
                        runValidators: true 
                    })
                );
            }
            return Promise.all(promises);
        })
        .then((done) => {
            return Cart.deleteMany({ UserId: req.user._id });
        })
        .then((deleted) => {
            res.status(200).json({ message: `Checkout success` });
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = CartController;