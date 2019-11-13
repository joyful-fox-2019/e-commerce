const router = require('express').Router()
    , CartController = require('../controllers/CartController')
    , {authentication, cartAuthorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/',CartController.getCart)
router.patch('/:productId',CartController.create)
router.delete('/:id',cartAuthorization,CartController.delete)

module.exports = router