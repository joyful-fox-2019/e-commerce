`use strict`
const router = require('express').Router()
const transactionController = require('../contollers/transactionController')
const {authenticate, authorize} = require('../middlewares/auth')

router.use(authenticate)
router.post('/', transactionController.create)
router.get('/', transactionController.findAll)
router.put('/:id', transactionController.update)

module.exports = router