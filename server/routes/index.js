const router = require('express').Router();
const UserRouter = require('../routes/users');
const ProductRouter = require('./products');
const CartRouter = require('./carts');

router.use('/users', UserRouter);
router.use('/products', ProductRouter);
router.use('/carts', CartRouter);

module.exports = router;