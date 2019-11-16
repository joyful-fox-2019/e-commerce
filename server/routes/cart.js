const router = require('express').Router()
const cartController = require('../controllers/cart')
const { authentication, customerAuthorization } = require('../middlewares/auth')

console.log("custtt authhhhhhhh")
router.use(authentication)
router.get('/', customerAuthorization, cartController.find)
router.get('/:id', customerAuthorization, cartController.findOne)
router.post('/', customerAuthorization, cartController.create)
router.patch('/:id', customerAuthorization, cartController.update)
router.delete('/:id', customerAuthorization, cartController.delete)

module.exports = router