const router = require('express').Router();
const Cart = require('../controllers/cartController');
const {
    authentication,
    authorization,
    authorizationRole
} = require('../middleware/auth');
router.use(authentication)
router.post('/', Cart.create)
router.get('/', Cart.infoCart)

module.exports = router