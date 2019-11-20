const router = require('express').Router();
const userRouter = require('./user');
const itemRouter = require('./item');

router.get('/', (req, res, next) => {
    res.status(200).json('server is running!')
})

router.use('/users', userRouter);
router.use('/items', itemRouter);

module.exports = router;