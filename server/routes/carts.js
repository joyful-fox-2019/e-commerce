const routes = require("express").Router();
const auth = require("../middlewares/auth");
const CartController = require("../controllers/CartController.js");

routes.get("/", auth.authentication, auth.customerOnly, CartController.findAll)
routes.post("/", auth.authentication, auth.customerOnly, CartController.create)
routes.delete("/:cartId", auth.authentication, auth.customerOnly, auth.cartAuth, CartController.delete)
routes.patch("/:cartId", auth.authentication, auth.customerOnly, auth.cartAuth, CartController.update)

module.exports = routes;