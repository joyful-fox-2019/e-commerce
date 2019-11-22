const routes = require('express').Router();
const CartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

routes.use(authentication)
routes.get('/', CartController.findCart)
routes.post('/:id', CartController.addCart)

routes.use('/:id',authorization)
routes.delete('/:id', CartController.delete)

module.exports = routes