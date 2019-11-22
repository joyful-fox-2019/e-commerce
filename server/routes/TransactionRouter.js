const routes = require("express").Router()
const TransactionController = require("../controllers/TransactionController")

routes.get('/', TransactionController.findAll)
routes.patch('/:id', TransactionController.updateStatus)

module.exports = routes