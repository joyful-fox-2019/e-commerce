const Transaction = require('../models/Transaction')

class TransactionController {
    static findAll (req, res, next) {
        Transaction.find({
            BuyerId: req.loggedUser.id
        })
        .populate('product')
        .then (data => {
            res.status(200).json(data)
        })
        .catch (err => {
            next(err)
        })
    }

    static updateStatus (req, res, next) {
        Transaction.findByIdAndUpdate(req.params.id, {status: true })
        .then (result => {
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
}

module.exports = TransactionController