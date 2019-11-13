const User = require("../models/user.js");
const Product = require("../models/product.js");
const Transaction = require("../models/transaction.js");

class TransactionController {
    static find (req, res, next) {
        Transaction.find({
            BuyerId: req.user._id
        })
        .then((transactions) => {
            res.status(200).json(transactions);
        })
        .catch((err) => {
            next(err);
        });
    }
    static findOne (req, res, next) {
        Transaction.findOne({
            _id: req.params.id,
            BuyerId: req.user._id
        })
        .then((transaction) => {
            res.status(200).json(transaction);
        })
        .catch((err) => {
            next(err);
        });
    }
    static patch (req, res, next) {
        let transaction = {};
        Transaction.findOne({
            _id: req.params.id,
            BuyerId: req.user._id
        })
        .then((found) => {
            if (!found) {
                let err = { status: 404, message: `Transaction not found` };
                throw err;
            }
            else {
                transaction = found;
                if (found.status !== "paid") {
                    let err = { status: 403, message: `Unable to change transaction` };
                    throw err;
                }
                else {
                    if (req.body.status === "done") {
                        Transaction.updateOne({
                            _id: req.params.id,
                            BuyerId: req.user._id
                        }, { $set : { 
                            status: "done"
                        }})
                        .then((done) => {
                            let promises = [];
                            for (let i = 0; i < transaction.products.length; i++) {
                                promises.push(
                                    User.findOne({
                                        _id: transaction.products[i].SellerId
                                    })
                                    .then((found) => {
                                        return User.updateOne({
                                            _id: transaction.products[i].SellerId
                                        }, { $set: {
                                            balance: Number(found.balance) + (Number(transaction.products[i].qty) * Number(transaction.products[i].price))
                                        }})
                                    })
                                );
                            }
                            return Promise.all(promises);
                        });
                    }
                    else if (req.body.status === "cancel") {
                        Transaction.updateOne({
                            _id: req.params.id,
                            BuyerId: req.user._id
                        }, { $set : { 
                            status: "cancel"
                        }})
                        .then((done) => {
                            let promises = [];
                            for (let i = 0; i < transaction.products.length; i++) {
                                promises.push(
                                    User.findOne({
                                        _id: req.user._id
                                    })
                                    .then((found) => {
                                        return User.updateOne({
                                            _id: req.user._id
                                        }, { $set: {
                                            balance: Number(found.balance) + (Number(transaction.products[i].qty) * Number(transaction.products[i].price))
                                        }})
                                    }),
                                    Product.findOne({
                                        _id: transaction.products[i]._id
                                    })
                                    .then((found) => {
                                        return Product.updateOne({
                                            _id: transaction.products[i]._id
                                        }, { $set: {
                                            stock: Number(found.stock) + Number(transaction.products[i].qty)
                                        }})
                                    })
                                );
                            }
                            return Promise.all(promises);
                        });
                    }
                }
            }
        })
        .then((updated) => {
            res.status(200).json({ message: `Transaction finished` });
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = TransactionController;