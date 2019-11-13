const router = require("express").Router();
const CartController = require("../controllers/cart.js");
const authenticate = require("../middlewares/authenticate.js");

router.use(authenticate);
router.get("/", CartController.find);
router.post("/", CartController.create);
router.put("/:id", CartController.update);
router.delete("/:id", CartController.delete);
router.post("/checkout", CartController.checkout);

module.exports = router;