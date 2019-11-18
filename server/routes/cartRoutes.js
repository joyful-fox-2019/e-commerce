const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authentication, authorizationCart} = require('../middlewares/auth')

router.use(authentication)

router.get('/', CartController.read)
router.post('/', CartController.create)

router.use('/:id', authorizationCart)

router.delete('/:id', CartController.delete)


module.exports = router