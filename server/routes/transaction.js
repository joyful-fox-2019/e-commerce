const Route = require('express').Router()
const Transaction = require('../controllers/transaction');
const { authentication, transaction } = require('../middlewares/auth');

Route.get('/', authentication, transaction, Transaction.getTransaction)
Route.post('/', authentication, transaction, Transaction.createTransaction)

module.exports = Route;