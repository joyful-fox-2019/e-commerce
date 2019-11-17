const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const isLogin = require('../middlewares/isLogin')

router.get('/completed', transactionController.getCompleted)
router.get('/uncompleted', transactionController.getUncompleted)
router.get('/user', isLogin, transactionController.getOne)
router.post('/', isLogin, transactionController.checkout)
router.patch('/tracknumber/:id', transactionController.inputTrackNumber)
router.patch('/confirm/:id', transactionController.confirmArrived)

module.exports = router