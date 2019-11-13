const router = require('express').Router()
const ProductController = require('../controllers/productController')
const {authentication, adminAuthorization} = require('../middlewares/authentication')

router.get('/', ProductController.getProduct)
router.get('/search', ProductController.search)
router.get('/page/:page', ProductController.getProductPagination)
router.get('/:id', ProductController.getOne)

router.post('/', authentication, adminAuthorization, ProductController.createProduct)

module.exports = router