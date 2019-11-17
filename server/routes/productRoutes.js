const routes = require('express').Router();
const ProductController = require('../controllers/product')
const Authentication = require('../middlewares/authentication')
const { admin } = require('../middlewares/authorization')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

routes.get('/', ProductController.findAll)
routes.get('/search', ProductController.search)
routes.use(Authentication)

routes.use(admin)
routes.post('/', multer.single('img'), gcs ,ProductController.create)
routes.put('/:id', multer.single('img'), gcs, ProductController.update)
routes.delete('/:id', ProductController.delete)


module.exports = routes