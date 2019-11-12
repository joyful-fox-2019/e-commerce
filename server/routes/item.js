const router = require('express').Router()
const ItemController = require('../controllers/itemCon')
const { authentication, authCustomer, authAdmin, authorization} = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', ItemController.showAll)
router.get('/:id', ItemController.showOne)
router.post('/', authAdmin, multer.single('image'), gcs, ItemController.create)
router.put('/:id', authAdmin, ItemController.update)
router.delete('/:id', authAdmin, ItemController.delete)

module.exports = router