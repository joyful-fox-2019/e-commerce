const express = require ('express')
const Router = express.Router()
const CartController = require('../controllers/cartController')
const auth = require('../middlewares/auth')
const authoCart = require('../middlewares/authoCart')

Router.get('/', auth,CartController.readAll)
Router.post('/:productId', auth, CartController.create)
Router.delete('/:cartId',auth,authoCart,CartController.deleteCart)

module.exports = Router