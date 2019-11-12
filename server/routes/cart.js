const router = require('express').Router()
const CartController = require('../controllers/cart')

// create Cart
router.post('/', CartController.createCart);

// get Cart
router.get('/', CartController.getUserCart);

// delete All Cart
router.delete('/', CartController.deleteWholeCart);

// delete Cart
router.delete('/:id', CartController.deleteCart);

module.exports = router