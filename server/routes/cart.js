const router = require('express').Router()
const CartController = require('../controllers/cart')

// get Cart
router.get('/', CartController.getAllCart)

// create Cart
router.post('/', CartController.createCart);

// delete One Product From cart
router.delete('/:id', CartController.deleteCart);

// delete All Cart
router.delete('/', CartController.deleteWholeCart);

module.exports = router