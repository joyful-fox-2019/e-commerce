const Route = require('express').Router()
const Transaction = require('../controllers/transaction');
const { authentication, transaction, confirmTransaction, updateStatusTransaction } = require('../middlewares/auth');

// Route.get('/', Transaction.getConfirmTransaction);

Route.get('/', authentication, transaction, Transaction.getTransaction)
Route.post('/', authentication, transaction, Transaction.createTransaction)


Route.patch('/confirm/:id', authentication, confirmTransaction, Transaction.updateStatusConfirm)
Route.patch('/received/:id', authentication, updateStatusTransaction, Transaction.updateStatusReceived);

module.exports = Route;