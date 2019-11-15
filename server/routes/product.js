const router = require('express').Router()
const productController = require('../controllers/product')
const {authentication} = require('../middlewares/auth')

    router.get('/', productController.allProduct)
    router.get('/search?', productController.searchProduct)
    router.get('/:id', productController.selectedProduct)
    router.get('/page/:page', productController.pageProduct)

    router.use(authentication)
    router.patch('/add/:id', productController.addProduct)
    router.patch('/remove/:id', productController.removeProduct)

module.exports = router