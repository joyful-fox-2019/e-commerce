const routes = require("express").Router();
const auth = require("../middlewares/auth");
const UserController = require("../controllers/UserController.js");

routes.post("/login", UserController.login);
routes.post("/register", UserController.register);
routes.patch("/", auth.authentication, UserController.update);
routes.get("/profile", auth.authentication, UserController.getUser);


module.exports = routes;