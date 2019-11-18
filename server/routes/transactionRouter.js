const express = require('express')
const Router = express.Router()
const TransactionController = require('../controllers/transactionController')
const auth = require('../middlewares/auth')


Router.get('/', auth,TransactionController.readMe)
Router.post('/', auth,TransactionController.create)

module.exports = Router