const router = require('express').Router();
const CartController = require('../controllers/cart');
const authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, CartController.create);
router.get('/', authenticate, CartController.showAll);
router.get('/:id', authenticate, CartController.showOne);
router.delete('/:id', authenticate, CartController.delete);

module.exports = router;