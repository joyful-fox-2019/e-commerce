const express = require('express')
const transactions = express.Router()
const transactionController = require('../controllers/transactionController')
const transAuthorize = require('../middlewares/transAuthorize')
const authenticate = require('../middlewares/authenticate')
const admin = require('../middlewares/admin')

transactions.use(authenticate)
transactions.post('/', transactionController.create)
transactions.get('/', transactionController.all)
transactions.patch('/:id', transAuthorize, transactionController.update)
transactions.use(admin)
transactions.get('/admin', transactionController.adminAll)
transactions.patch('/admin/:id', transactionController.adminUpdate)

module.exports = transactions;