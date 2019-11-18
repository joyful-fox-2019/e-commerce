const router = require('express').Router();
const CartController = require('../controllers/cart');
const authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, CartController.create);
router.get('/', authenticate, CartController.showAll);
router.get('/latest', authenticate, CartController.showOneLatest);
router.get('/:id', authenticate, CartController.showOne);
router.post('/:id', authenticate, CartController.addToCart);
router.post('/remove/:id', authenticate, CartController.removeFromCart);
router.delete('/:id', authenticate, CartController.delete);

module.exports = router;