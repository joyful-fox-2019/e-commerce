const router = require('express').Router();
const userRouter = require('./user');
const itemRouter = require('./item');
const cartRouter = require('./cart');

router.use('/users', userRouter);
router.use('/items', itemRouter);
router.use('/carts', cartRouter);

module.exports = router;