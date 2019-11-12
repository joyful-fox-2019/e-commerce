const router = require('express').Router();
const ProductController = require('../controllers/product');
const authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, ProductController.create);
router.get('/', ProductController.showAll);
router.get('/:id', ProductController.showOne);
router.delete('/:id', authenticate, ProductController.delete);

module.exports = router;