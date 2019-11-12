const router = require('express').Router()
const TransactionController = require('../controllers/transaction')

// create Transaction
router.post('/', TransactionController.createTransaction)

module.exports = router