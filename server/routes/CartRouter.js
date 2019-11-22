const routes = require("express").Router()
const CartController = require("../controllers/CartController")
const { buyerAuthorization } = require("../middlewares/authorization")

routes.use(buyerAuthorization)
routes.get("/", CartController.findAll)
routes.post("/", CartController.create)
routes.delete("/:id", CartController.delete)
routes.get("/checkout", CartController.checkout)

module.exports = routes