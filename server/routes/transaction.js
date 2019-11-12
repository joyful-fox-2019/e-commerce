const Route = require('express').Router()
const Transaction = require('../controllers/transaction');
const { authentication, transaction } = require('../middlewares/auth');

Route.post('/', authentication, transaction, Transaction.createTransaction)

module.exports = Route;