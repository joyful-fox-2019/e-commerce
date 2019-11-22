const Route = require('express').Router()
const Transaction = require('../controllers/transaction');
const { authentication, transaction, updateStatusTransaction, isAdmin } = require('../middlewares/auth');

// Route.get('/', Transaction.getConfirmTransaction);

Route.get('/', authentication, isAdmin, Transaction.getTransaction)
Route.post('/', authentication, transaction, Transaction.createTransaction)


Route.patch('/confirm/:id', authentication, isAdmin, Transaction.updateStatusConfirm)
Route.patch('/decline/:id', authentication, isAdmin, Transaction.declineTransaction)
Route.patch('/received/:id', authentication, updateStatusTransaction, Transaction.updateStatusReceived);

module.exports = Route;