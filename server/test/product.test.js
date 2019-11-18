const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const {readFileSync} = require("fs")
const testFunction = require("../helpers/testFunction")

var tokenAdmin;
var tokenCostumer;
var productId;
chai.use(chaiHttp);

let file = readFileSync("./test/test.png")

describe("Product Route Test", function () {
    describe("simulate user login", function() {
        it("Should success login Admin with status 200 with no error and get token",function(done){
            let user = {
                "email": "admin@email.com",
                "password": "12345"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                tokenAdmin = res.body.token
                done();
            })
        });
        it("Should success login customer with status 200 with no error and get token",function(done){
            let user = {
                "email": "hengki@gmail.com",
                "password": "12345",
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                tokenCostumer = res.body.token
                done();
            })
        })
    })
    describe(" GET /products", function () {
        it("should get product data with status 200 with no error", function (done) {
            chai
            .request(app)
            .get("/products")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array")
                res.body.forEach(element => {
                    expect(element).to.have.keys(["_id","name","image","price","stock"])
                });
                done()
            });
        });
    });
    describe(" POST /products", function () {
        it("should success get product data with status 200 with no error", function (done) {
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .attach("image", file, "file.png")
            .field("name", "sepatu mahal")
            .field("price", "1000000")
            .field("stock", "10")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                
                productId = res.body._id; 
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.keys(["_id","name","image","price","stock"])     
                done();
            });
        });
        it("user not logged on or token is invalid", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: "kajshdkajhdkajshdkajh"})
            .attach("image", file, "file.png")
            .field("name", "sepatu mahal")
            .field("price", "1000000")
            .field("stock", "10")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,403,"Token is Invalid")  
                done();
            });
        })
        it("not authorized because add product using customer account get statusCode 401", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenCostumer})
            .attach("image", file, "file.png")
            .field("name", "sepatu mahal")
            .field("price", "1000000")
            .field("stock", "10")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,401,"Not Authorized")    
                done();
            });
        })
        it("price < 0 get status code 400 with validation error message", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .attach("image", file, "file.png")
            .field("name", "sepatu mahal")
            .field("price", "-1")
            .field("stock", "10")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,400,"Product validation failed")     
                done();
            });
        })
        it("stock < 0 get status code 400 with validation error message", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .attach("image", file, "file.png")
            .field("name", "sepatu mahal")
            .field("price", "10")
            .field("stock", "-1")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,400,"Product validation failed")    
                done();
            });
        })
        it("stock > 999 get status code 400 with validation error message", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .attach("image", file, "file.png")
            .field("name", "sepatu mahal")
            .field("price", "10")
            .field("stock", "1000")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,400,"Product validation failed")     
                done();
            });
        })
        it("not includes image while post data", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .field("name", "sepatu mahal")
            .field("price", "10")
            .field("stock", "10")
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,400,"Path `image` is required") 
                done();
            });
        })
    });
    describe("DELETE /products", function(){
        it("success delete with code 200", function(done){
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .set({authorization:tokenAdmin})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.successTest(err,res)
                expect(res.body.message).to.equal("Delete Success")
                done()
            })
        })
        it("failed delete invalid id", function(done){
            chai
            .request(app)
            .delete(`/products/5cb4c91945915a175607648f`)
            .set({authorization:tokenAdmin})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,400,"Item id not found")
                done()
            })
        })
        it("failed delete when token is invalid/user not logged in", function(done){
            chai
            .request(app)
            .delete(`/products/5cb4c91945915a175607648f`)
            .set({authorization:"alknfalknfalkfnaleknf"})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,403,"Token is Invalid")
                done()
            })
        })
        it("failed delete when token is not admin", function(done){
            chai
            .request(app)
            .delete(`/products/5cb4c91945915a175607648f`)
            .set({authorization:tokenCostumer})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,401,"Not Authorized")
                done()
            })
        })
    })

    
});

