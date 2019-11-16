const Product = require("../models/Product")

module.exports = {
    productAuthorization (req, res, next) {
        console.log(req.loggedUser)
        let { id } = req.params
        Product.findOne({
            _id : id
        })
        .then ((result) => {
            if (result.SellerId == req.loggedUser.id){
                next()
            } else {
                const err = new Error("Not authorized user")
                err.name = "Unauthorized"
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    },
    sellerAuthorization (req, res, next) {
        let User = req.loggedUser.role
        if (User === "Seller"){
            next()
        } else {
            let err = new Error ("Bukan Penjual")
            err.name = "SellerError"
            next(err)
        }
    },
    buyerAuthorization (req, res, next) {
        let User = req.loggedUser.role
        if (User === "Buyer"){
            next()
        } else {
            let err = new Error ("Bukan Pembeli")
            err.name = "BuyerError"
            next(err)
        }
    },
    adminAuthorization (req, res, next) {
        let User = req.loggedUser.role
        if (User == 'Admin'){
            next()
        } else {
            let err = new Error ("Bukan Admin")
            err.name = 'AdminError'
            next(err)
        }
    }
}