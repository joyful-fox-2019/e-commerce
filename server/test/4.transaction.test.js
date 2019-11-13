const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user.js");
const Product = require("../models/product.js");
const Cart = require("../models/cart.js");
const Transaction = require("../models/transaction.js");
const testing = require("../helpers/testing.js");

// Use Chai HTTP
chai.use(chaiHttp);
const expect = chai.expect;

let userId = "";
let userToken = "";
let firstProductId = "";
let firstTransactionId = "";
let wrongTransactionId = "5dc9817af20eb753856b3aea";

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
        return Transaction.create({
            BuyerId: userId,
            address: "Hacktiv8",
            products: [{
                _id: result._id,
                name: result.name,
                price: result.price,
                stock: result.stock,
                qty: 1,
                SellerId: result.UserId,
            }],
            status: "paid"
        });
    })
    .then((result) => {
        firstTransactionId = result._id
        done();
    })
    .catch((err) => {
        console.log(err);
    });
});

// Delete record after testing
after(function(done) {
    if (process.env.NODE_ENV === "testing") {
        User.deleteMany()
        .then((deleted) => {
            console.log(`All user records deleted.`);
            return Product.deleteMany();
        })
        .then((deleted) => {
            console.log(`All product records deleted.`);
            return Cart.deleteMany();
        })
        .then((deleted) => {
            console.log(`All cart records deleted.`);
            return Transaction.deleteMany();
        })
        .then((deleted) => {
            console.log(`All transaction records deleted.`);
            done();
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

describe("Transaction Routing Tests", function() {
    this.timeout(30000);
    describe("GET /transactions/", function() {
        describe("Success Response", function() {
            it("Should return an array of object value containing all user transactions with HTTP status code 200", function(done) {
                chai.request(app)
                .get("/transactions")
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
                .get("/transactions")
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
    describe("GET /transactions/:id", function() {
        describe("Success Response", function() {
            it("Should return an object value containing one specific user transaction with HTTP status code 200", function(done) {
                chai.request(app)
                .get("/transactions/"+firstTransactionId)
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object").to.have.any.keys("BuyerId","address","products","status");
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .get("/transactions/"+firstTransactionId)
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
    describe("PATCH /transactions/:id", function() {
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200 when status is done", function(done) {
                chai.request(app)
                .patch("/transactions/"+firstTransactionId)
                .send({
                    status: "done"
                })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Transaction finished");
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 403 because transaction is finished", function(done) {
                chai.request(app)
                .patch("/transactions/"+firstTransactionId)
                .send({
                    status: "cancel"
                })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Unable to change transaction");
                    done();
                });
            });
            it("Should return an error with HTTP status code 404 because transaction not found", function(done) {
                chai.request(app)
                .patch("/transactions/"+wrongTransactionId)
                .send({
                    status: "done"
                })
                .set("jwt_token", userToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object').to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Transaction not found");
                    done();
                });
            });
        });
    });
});