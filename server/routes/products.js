const product = require('express').Router()
const {add,update,remove,findAll,findOne,addToFav,removeFav} = require('../controllers/productController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization
const { multer,sendUploadToGCS } = require('../middlewares/uploader')

product.get('/',findAll)
product.get('/:productId',findOne)
product.post('/add',auth,authz,multer.single('image'),sendUploadToGCS,add)
product.patch('/addwishlist/:productId',auth,addToFav)
product.patch('/removewishlist/:productId',auth,removeFav)
product.patch('/:productId',auth,authz,multer.single('image'),sendUploadToGCS,update)
product.delete('/:productId',auth,authz,remove)


module.exports = product