const routes = require('express').Router()
const cartController = require('../controllers/cart')
const { authentication, authorizationCart } = require('../middlewares/auth')

routes.get('/', cartController.findAll)
routes.use(authentication)
routes.get('/mycarts', cartController.findMyCart)
routes.delete('/', cartController.deleted)
routes.post('/', cartController.create)
routes.patch('/:id', authorizationCart, cartController.updateQuantities)
routes.delete('/', authorizationCart, cartController.deleted)

module.exports = routes