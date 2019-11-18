const router = require('express').Router()
const { authentication, authorizationWishlist } = require('../middleware/auth')
const WishlistController = require('../controllers/WishlistController')

router.get('/', authentication, WishlistController.find)
router.post('/:id', authentication, WishlistController.create)
router.get('/:id', authentication, WishlistController.findByProductId)
router.delete('/:id', authentication, authorizationWishlist, WishlistController.delete)

module.exports = router
