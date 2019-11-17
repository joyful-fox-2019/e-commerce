const product = require('express').Router()
const {add,update,remove,findAll,findOne} = require('../controllers/productController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization
const { multer,sendUploadToGCS } = require('../middlewares/uploader')

product.get('/',findAll)
product.get('/:productId',findOne)
product.post('/add',auth,authz,multer.single('image'),sendUploadToGCS,add)
product.patch('/:productId',auth,authz,multer.single('image'),sendUploadToGCS,update)
product.delete('/:productId',auth,authz,remove)


module.exports = product