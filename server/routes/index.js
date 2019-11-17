const router = require('express').Router();
const UserController = require('../controllers/userController');
const ProductRouter = require('../routes/productRouter');
const authen = require('../middlewares/authen');

router.get('/hello', (req, res)=>{
    res.status(200).json({msg:"hello"})
})
router.post('/register', UserController.register);
router.post('/login', UserController.login)
router.get('/cart', authen, UserController.getCart)

router.use('/products', ProductRouter);

module.exports = router;