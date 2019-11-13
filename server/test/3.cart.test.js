const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user.js");
const Product = require("../models/product.js");
const Cart = require("../models/cart.js");
const testing = require("../helpers/testing.js");

// Use Chai HTTP
chai.use(chaiHttp);
const expect = chai.expect;

let userId = "";
let userToken = "";
let firstProductId = "";
let secondProductId = "";

// Hooks before doing testing
before(function(done) {
    // Sign in user
    testing.signin({
        email: "edirates@gmail.com",
        password: "edison1234"
    })
    .then((result) => {
        userId = result._id;
        userToken = result.jwt_token;
        return Product.create({
            name: "iPhone 11",
            description: "Latest version of iPhone",
            price: "20000000",
            stock: "3",
            featured_image: "https://storage.cloud.google.com/miniwp.images.edirates.xyz/1573469727561macpro.jpeg",
            status: true,
            UserId: userId
        });
    })
    .then((result) => {
        firstProductId = result._id;
        return Product.create({
            name: "iPad Pro",
            description: "Latest version of iPad",
            price: "10000000",
            stock: "2",
            featured_image: "https://storage.cloud.google.com/miniwp.images.edirates.xyz/1573469727561macpro.jpeg",
            status: true,
            UserId: userId
        })
    })
    .then((result) => {
        secondProductId = result._id;
        done();
    })
    .catch((err) => {
        console.log(err);
    });
});

// Delete record after testing
// after(function(done) {
//     if (process.env.NODE_ENV === "testing") {
//         User.deleteMany()
//         .then((deleted) => {
//             console.log(`All user records deleted.`);
//             return Product.deleteMany();
//         })
//         .then((deleted) => {
//             console.log(`All product records deleted.`);
//             return Cart.deleteMany();
//         })
//         .then((deleted) => {
//             console.log(`All cart records deleted.`);
//             done();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }
// });

describe("Cart Routing Tests", function() {
    this.timeout(30000);
    describe("POST /cart/", function() {
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200 when product not found in cart", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    ProductId: firstProductId,
                    qty: 5
                })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Added to the cart");
                    done();
                });
            });
            it("Should return an object value with HTTP status code 200 when product already in cart", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    ProductId: firstProductId,
                    qty: 5
                })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Updated qty in cart");
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 400 because of empty ProductId value", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    qty: 5
                })
                .set("jwt_token", userToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Product is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty qty value", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    ProductId: secondProductId,
                })
                .set("jwt_token", userToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Quantity is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of qty below 1", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    ProductId: secondProductId,
                    qty: 0
                })
                .set("jwt_token", userToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Minimum quantity is 1");
                    done();
                });
            });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    ProductId: secondProductId,
                    qty: 10
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
        });
    });
    describe("GET /cart/", function() {
        describe("Success Response", function() {
            it("Should return an array of object value containing all products in cart with HTTP status code 200", function(done) {
                chai.request(app)
                .get("/cart")
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array')
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .get("/cart")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
        });
    });
    describe("PUT /cart/", function() {
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .put("/cart/"+firstProductId)
                .send({ qty: 5 })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Updated qty in cart");
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 404 because of product not found in cart", function(done) {
                chai.request(app)
                .put("/cart/"+secondProductId)
                .send({ qty: 5 })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Product not found in cart");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty qty value", function(done) {
                chai.request(app)
                .put("/cart/"+firstProductId)
                .send({
                    qty: "",
                })
                .set("jwt_token", userToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Quantity is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of qty below 1", function(done) {
                chai.request(app)
                .put("/cart/"+firstProductId)
                .send({
                    qty: 0
                })
                .set("jwt_token", userToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Minimum quantity is 1");
                    done();
                });
            });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .put("/cart/"+firstProductId)
                .send({
                    qty: 10
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
        });
    });
    describe("DELETE /cart/", function() {
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 404 because of product not found in cart", function(done) {
                chai.request(app)
                .delete("/cart/"+secondProductId)
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Product not found in cart");
                    done();
                });
            });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .delete("/cart/"+firstProductId)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
        });
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .delete("/cart/"+firstProductId)
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Removed product from cart");
                    done();
                });
            });
        });
    });
    describe("POST /cart/checkout", function() {
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 404 because of empty cart", function(done) {
                chai.request(app)
                .post("/cart/checkout")
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Product not found please add to cart");
                    done();
                });
            });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .post("/cart/checkout")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
            it("Should return an object value with HTTP status code 200 when product not found in cart", function(done) {
                chai.request(app)
                .post("/cart")
                .send({
                    ProductId: firstProductId,
                    qty: 10
                })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Added to the cart");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of insufficient product stock", function(done) {
                chai.request(app)
                .post("/cart/checkout")
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    // expect(res.body.message).to.be.an("array").that.includes("Insufficient stock for");
                    done();
                });
            });
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .put("/cart/"+firstProductId)
                .send({ qty: 1 })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Updated qty in cart");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because empty address value", function(done) {
                chai.request(app)
                .post("/cart/checkout")
                .set("jwt_token", userToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Address is required");
                    done();
                });
            });
        });
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .post("/cart/checkout")
                .send({ address: "Hacktiv8" })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Checkout success");
                    done();
                });
            });
        });
    });
});