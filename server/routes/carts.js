const router = require('express').Router()
const CartController = require('../controllers/cart')

router.get('/', CartController.find)
router.post('/', CartController.create)
router.patch('/:id', CartController.update)

module.exports = router