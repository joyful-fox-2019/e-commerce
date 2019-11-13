const router = require("express").Router();
const userRouter = require("./user.js");
const productRouter = require("./product.js");
const cartRouter = require("./cart.js");
const transactionRouter = require("./transaction.js");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/transactions", transactionRouter);

module.exports = router;