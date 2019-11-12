const router = require('express').Router()
const ProductController = require('../controllers/product')

router.get('/', ProductController.find)
router.post('/', ProductController.create)

module.exports = router