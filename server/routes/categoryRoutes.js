const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const isLogin = require('../middlewares/isLogin')

router.get('/', categoryController.getAll)
router.get('/:name', categoryController.getOne)
router.post('/', isLogin, categoryController.create)

module.exports = router