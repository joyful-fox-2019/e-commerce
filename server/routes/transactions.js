const router = require("express").Router();
const auth = require("../middlewares/auth");
const TransactionController = require("../controllers/TransactionController.js");

router.get("/", auth.authentication, TransactionController.findAll)
router.post("/", auth.authentication, auth.customerOnly,  TransactionController.create)
router.patch("/:transactionId", auth.authentication, TransactionController.update)

module.exports = router;