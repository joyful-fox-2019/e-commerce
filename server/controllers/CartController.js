const Cart = require("../models/Cart")
const Product = require("../models/Product")
const Transaction = require('../models/Transaction')

class CartController {
    static create (req, res, next) {
        let { countProduct, _id } = req.body
        let BuyerId = req.loggedUser.id 
        Product.findById(_id)
        .then (data => {
            // let price = countProduct * data.price
            return  Cart.create({
                        countProduct,
                        BuyerId,
                        product: _id,
                        // price
                    })
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        let BuyerId = req.loggedUser.id
        Cart.find({
            BuyerId
        })
        .populate("product")
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let { id } = req.params
        Cart.findOneAndDelete({
            _id: id
        })
        .then ((result) => {
            if (result !== null) res.status(200).json(result)
            else {
                let err = new Error ('Data Not Found')
                err.name = 'DataError'
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }

    static checkout (req, res, next) {
        let id = req.loggedUser.id
        let arrTemp = []
        let arrProduct = []
        let arrCount = []
        let temp = 0
        Cart.find({
            BuyerId: id
        })
        .populate('product')
        .then (result => {
            // console.log(result)
            for (let i = 0; i < result.length; i++) {
                temp += result[i].price
                if (result[i].product.stock < result[i].countProduct) {
                    throw {
                        message: 'Stok tidak cukup',
                        name: 'StockFailed'
                    }
                } else {
                    arrProduct.push(result[i].product._id)
                    arrCount.push(result[i].countProduct)
                    arrTemp.push({
                        _id: result[i].product,
                        count: result[i].countProduct,
                        price: result[i].price
                    })
                }
            }
            return arrTemp
        })
        .then (() => {
            async function tes() {
                for (let i = 0; i < arrTemp.length; i++) {
                    // console.log(arrTemp[i]._id)
                    await Product.findOne({
                        _id: arrTemp[i]._id
                    })
                    .then (async result => {
                        // console.log(result.stock)
                        arrTemp[i].stokAwal = result.stock
                        arrTemp[i].stokSisa = result.stock - arrTemp[i].count
                        
                        arrTemp[i].nama = result.product
                        arrTemp[i].sold = result.sold + arrTemp[i].count
                        if (arrTemp[i].stokSisa >=0) {
                            return arrTemp
                        } else {
                            let err = new Error('Stok barang tidak cukup')
                            err.name = 'StockFailed'
                            next(err)
                        }
                        // console.log(arrTemp[i].stokAwal)
                        
                    })
                    .catch (err => {
                        next(err)
                    })
                }
            }
            return tes()
        })
        .then (() => {
            async function updateProduct() {
                for (let i = 0; i < arrTemp.length; i++) {
                    await Product.findOneAndUpdate({
                        _id: arrTemp[i]._id
                    }, {
                        stock: arrTemp[i].stokSisa,
                        sold: arrTemp[i].sold
                    })
                }
            }
            return updateProduct()
        })
        .then (() => {
            return Cart.deleteMany({
                BuyerId: req.loggedUser.id
            })
        })
        .then (() => {
            return Transaction.create({
                BuyerId: id,
                product: arrProduct,
                count: arrCount,
                price: temp,
                status: false
            })
        })
        .then (() => {
            console.log('harga', temp)
            console.log('arrTemp', arrTemp)
            // console.log('masuk gan')
            // console.log('UserId', id)
            res.status(200).json({
                msg: "Berhasil Checkout",
                TotalPrice: temp,
                TotalProduct: arrTemp
            })
        })
        .catch (err => {
            next(err)
        })
        
    }
}

module.exports = CartController