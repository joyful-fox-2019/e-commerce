const cartController = require('../contollers/cartController')
const router = require('express').Router()
const {authenticate, authorize} = require('../middlewares/auth')

router.use(authenticate)
router.post('/', cartController.create)
router.get('/', cartController.findAll)
router.get('/:id', cartController.findOne)
router.use(authorize)
router.put('/:id', cartController.update)
router.delete('/:id', cartController.delete)

module.exports = router