const router = require('express').Router()
const { cart } = require('../controllers')
const { authentication, cartAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', cart.add)
router.delete('/:id', cartAuthorization, cart.delete)

module.exports = router