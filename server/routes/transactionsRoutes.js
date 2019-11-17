const routes = require('express').Router();
const TransactionsController = require('../controllers/transactions')
const authentication = require('../middlewares/authentication')
const { admin, authorizationTransactions } = require('../middlewares/authorization')

routes.use(authentication)
routes.post('/', TransactionsController.addTransactions)
routes.get('/', TransactionsController.findAll)

routes.get('/pending', admin, TransactionsController.findPending)
routes.get('/approve', admin, TransactionsController.findApprove)
routes.patch('/approve/:id', admin, TransactionsController.setApprove)

routes.patch('/delivered/:id', authorizationTransactions, TransactionsController.setDelivered)


module.exports = routes