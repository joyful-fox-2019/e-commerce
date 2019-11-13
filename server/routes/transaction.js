const router = require("express").Router();
const TransactionController = require("../controllers/transaction.js");
const authenticate = require("../middlewares/authenticate.js");

router.use(authenticate);
router.get("/", TransactionController.find);
router.get("/:id", TransactionController.findOne);
router.patch("/:id", TransactionController.patch);

module.exports = router;