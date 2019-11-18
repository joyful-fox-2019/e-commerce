const router = require('express').Router();
const userRouter = require('./user');
const productRouter = require('./product');

router.get('/', (req, res, next) => {
    res.status(200).json('server is running!')
})

router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;