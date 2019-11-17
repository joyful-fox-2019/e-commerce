const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user.js");
const Product = require("../models/product.js");
const testing = require("../helpers/testing.js");
const fs = require("fs");

// Use Chai HTTP
chai.use(chaiHttp);
const expect = chai.expect;

// Declare Request Body
let newProductId = "";
let otherProductId = "";
let wrongProductId = "15dc93e20274f784242aedf80";
let notProductId = "5dc93e20274f784242aedf80";
let newProduct = {
    name: "Macbook Pro",
    description: "MBP 2019",
    price: "25000000",
    stock: "5",
    // featured_image: "https://storage.cloud.google.com/miniwp.images.edirates.xyz/1573469727561macpro.jpeg",
    // status: true,
    // UserId: ""
};

let initialToken = "";
let newToken = "";
let wrongToken = "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM5M2E1ZWU4Mzg3NzQxNTY0MWEwZTEiLCJuYW1lIjoiQXJ5YSBTdGFyayIsImVtYWlsIjoiYXJ5YUBnbWFpbC5jb20iLCJpYXQiOjE1NzM1MzE2ODJ9.EahqR3sEgsZNAZTgihJoLwNOAwSLWTespeWLGIcrd-w";

// Hooks before doing testing
before(function(done) {
    // Sign in user
    testing.signin({
        email: "edirates@gmail.com",
        password: "edison1234"
    })
    .then((result) => {
        initialToken = result.jwt_token;
        return testing.signin({
            email: "jon@snow.com",
            password: "jonsnow1234"
        })
    })
    .then((result) => {
        newToken = result.jwt_token;
        return Product.create({
            name: "Macbook",
            description: "Discontinued",
            price: "15000000",
            stock: "1",
            featured_image: "https://storage.cloud.google.com/miniwp.images.edirates.xyz/1573469727561macpro.jpeg",
            status: true,
            UserId: "5dc9350e7b21aa3ec060c8e1"
        })
    })
    .then((result) => {
        otherProductId = result._id;
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
//             done();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }
// });

describe("Product Routing Tests", function() {
    this.timeout(30000);
    describe("POST /products/", function() {
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end( function (err, res) {
                    newProductId = res.body._id;
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object').to.have.any.keys("_id", "name", "description", "price", "stock", "featured_image", "status", "UserId");
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 400 because of empty name value", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Name is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of name length below 3 characters", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "MB")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Minimum name length is 3");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty description value", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Description is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty price value", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", "")
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Price is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of price value below 1", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 0)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Price at least 1");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty stock value", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", "")
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Stock is required");
                    done();
                });
            });
            // it("Should return an error with HTTP status code 400 because of stock value below 1", function(done) {
            //     chai.request(app)
            //     .post("/products")
            //     .field("name", "Macbook Pro")
            //     .field("description", "Macbook Pro 2019")
            //     .field("price", 25000000)
            //     .field("stock", 0)
            //     .set("jwt_token", initialToken)
            //     .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
            //     .end(function(err, res) {
            //         expect(err).to.be.null;
            //         expect(res).to.have.status(400);
            //         expect(res.body).to.be.an("object").to.have.any.keys("message");
            //         expect(res.body.message).to.be.an("array").that.includes("Stock at least 1");
            //         done();
            //     });
            // });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because unsupported image type", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 1)
                .attach("featured_image", fs.readFileSync("./test/macpro.md"), "macpro.md")
                .set("jwt_token", initialToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("File not supported");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because empty featured image", function(done) {
                chai.request(app)
                .post("/products")
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .set("jwt_token", initialToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Feature image is required");
                    done();
                });
            });
        });
    });
    describe("GET /products/", function() {
        describe("Success Response", function() {
            it("Should return an array of object value containing all products with HTTP status code 200", function(done) {
                chai.request(app)
                .get("/products")
                .set("jwt_token", initialToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array')
                    done();
                });
            });
        });
    });
    describe("GET /products/user", function() {
        describe("Success Response", function() {
            it("Should return an array of object value containing all user products with HTTP status code 200", function(done) {
                chai.request(app)
                .get("/products/user")
                .set("jwt_token", initialToken)
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
                .get("/products/user")
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
    describe("GET /products/:id", function() {
        describe("Success Response", function() {
            it("Should return an object value containing one product with HTTP status code 200", function(done) {
                chai.request(app)
                .get("/products/"+newProductId)
                .set("jwt_token", initialToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object')
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 404 because product is not found", function(done) {
                chai.request(app)
                .get("/products/"+wrongProductId)
                .set("jwt_token", initialToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Product not found");
                    done();
                });
            });
        });
    });
    describe("PUT /products/", function() {
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Air")
                .field("description", "Macbook Air 2017")
                .field("price", 14000000)
                .field("stock", 3)
                .attach("featured_image", fs.readFileSync("./test/macair.jpg"), "macair.jpg")
                .set("jwt_token", initialToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("n", "nModified", "ok");
                    expect(res.body.n).to.be.equal(1);
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 400 because of empty name value", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Name is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of name length below 3 characters", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "MB")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Minimum name length is 3");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty description value", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "")
                .field("price", 25000000)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Description is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty price value", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", "")
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Price is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of price value below 1", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 0)
                .field("stock", 5)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Price at least 1");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty stock value", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", "")
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Stock is required");
                    done();
                });
            });
            // it("Should return an error with HTTP status code 400 because of stock value below 1", function(done) {
            //     chai.request(app)
            //     .put("/products/"+newProductId)
            //     .field("name", "Macbook Pro")
            //     .field("description", "Macbook Pro 2019")
            //     .field("price", 25000000)
            //     .field("stock", 0)
            //     .set("jwt_token", initialToken)
            //     .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
            //     .end(function(err, res) {
            //         expect(err).to.be.null;
            //         expect(res).to.have.status(400);
            //         expect(res.body).to.be.an("object").to.have.any.keys("message");
            //         expect(res.body.message).to.be.an("array").that.includes("Stock at least 1");
            //         done();
            //     });
            // });
            it("Should return an error with HTTP status code 400 because wrong product ID", function(done) {
                chai.request(app)
                .put("/products/"+wrongProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 10)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Invalid Object ID");
                    done();
                });
            });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
            it("Should return an error with HTTP status code 401 because different user token", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .set("jwt_token", newToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You are not authorized");
                    done();
                });
            });
            it("Should return an error with HTTP status code 404 because product not found", function(done) {
                chai.request(app)
                .put("/products/"+notProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .set("jwt_token", newToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Product not found");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because unsupported image type", function(done) {
                chai.request(app)
                .put("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 1)
                .attach("featured_image", fs.readFileSync("./test/macpro.md"), "macpro.md")
                .set("jwt_token", initialToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("File not supported");
                    done();
                });
            });
        });
    });
    describe("DELETE /products/", function() {
        describe("Success Response", function() {
            it("Should return an object value with HTTP status code 200", function(done) {
                chai.request(app)
                .delete("/products/"+newProductId)
                .set("jwt_token", initialToken)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').to.have.any.keys("n", "deletedCount", "ok");
                    expect(res.body.n).to.be.equal(1);
                    done();
                });
            });
        });
        describe("Error Response", function() {
            it("Should return an error with HTTP status code 400 because wrong product ID", function(done) {
                chai.request(app)
                .delete("/products/"+wrongProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 10)
                .set("jwt_token", initialToken)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Invalid Object ID");
                    done();
                });
            });
            it("Should return an error with HTTP status code 403 because user not logged in", function(done) {
                chai.request(app)
                .delete("/products/"+newProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You must log in first");
                    done();
                });
            });
            it("Should return an error with HTTP status code 401 because different user token", function(done) {
                chai.request(app)
                .delete("/products/"+otherProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .set("jwt_token", newToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("You are not authorized");
                    done();
                });
            });
            it("Should return an error with HTTP status code 404 because product not found", function(done) {
                chai.request(app)
                .delete("/products/"+notProductId)
                .field("name", "Macbook Pro")
                .field("description", "Macbook Pro 2019")
                .field("price", 25000000)
                .field("stock", 0)
                .attach("featured_image", fs.readFileSync("./test/macpro.jpeg"), "macpro.jpeg")
                .set("jwt_token", newToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.equal("Product not found");
                    done();
                });
            });
        });
    });
});