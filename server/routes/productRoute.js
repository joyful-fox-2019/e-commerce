const express = require('express')
const Router = express.Router()
const ProductController = require('../controllers/productController')
const auth = require('../middlewares/auth')
const autho = require('../middlewares/autho')
const upload = require('../middlewares/uploadImage')

Router.get('/', auth,ProductController.readAll)
Router.get('/me', auth,ProductController.readMe)
Router.post('/', auth,upload.single('file'),ProductController.create)
Router.delete('/:productId', auth,autho,ProductController.delete)
Router.put('/:productId',auth,autho,ProductController.updateProduct)



module.exports = Router