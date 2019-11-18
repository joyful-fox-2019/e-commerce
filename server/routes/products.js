const router = require('express').Router();
const ProductController = require('../controllers/product');
const authenticate = require('../middlewares/authenticate');
const gcsUpload = require('../middlewares/gcsUpload');

router.post('/', authenticate, gcsUpload.single('image'), ProductController.create);
router.get('/', ProductController.showAll);
router.get('/:id', ProductController.showOne);
router.delete('/:id', authenticate, ProductController.delete);

module.exports = router;