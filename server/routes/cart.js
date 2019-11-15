const router = require('express').Router()
const cartController = require('../controllers/cart')
const {authentication} = require('../middlewares/auth')


router.use(authentication)
router.get('/', cartController.seeCart)

// router.post('/', cartController.createCart)
// router.delete('/:id', cartAuthorization, cartController.removeCart)

module.exports = router