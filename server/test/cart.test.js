const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const testFunction = require("../helpers/testFunction")

var tokenAdmin;
var userId;
var tokenCostumer;
var cartId;
chai.use(chaiHttp);

describe("Cart Route Test", function () {
    describe("simulate user login", function(){
        it("Should success login Admin with status 200 with no error and get token",function(done){
            let user = {
                "email": "admin@email.com",
                "password": "12345",
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
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
                tokenCostumer = res.body.token;
                userId = res.body._id;
                done();
            })
        })
    })
    describe("GET /carts", function(){
        it("should get user carts with status code 200", function(done){
            chai
            .request(app)
            .get("/carts")
            .set({authorization:tokenCostumer})
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array")
                res.body.forEach(element => {
                    expect(element).to.have.keys(["_id","userId","product","count","isCheckout"])
                });
                done()
            });
        })
        it("should failed get user carts with admin auth with status code 401", function(done){
            chai
            .request(app)
            .get("/carts")
            .set({authorization:tokenAdmin})
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,401,"Not Authorized")
                done()
            });
        })
        it("should failed get user carts with no token with status code 401", function(done){
            chai
            .request(app)
            .get("/carts")
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,403,"Token is undefined")
                done()
            });
        })
    })
    describe("POST /carts", function(){
        it("should success add new data to user carts with respon 201", function(done){
            let data = {
                count: 10,
                product: "5cb9c8441448fb65ada06975",
            }
            chai
            .request(app)
            .post("/carts")
            .set({authorization:tokenCostumer})
            .send(data)
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                cartId = res.body._id;
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.keys(["_id","userId","product","count","isCheckout"])
                done()
            })
        })
        it("should failed add new data to user carts from admin with respon 401", function(done){
            let data = {
                userId: userId,
                product : "5cb9c8441448fb65ada06974",
                stock: 10
            }
            chai
            .request(app)
            .post("/carts")
            .set({authorization:tokenAdmin})
            .send(data)
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,401,"Not Authorized")
                done()
            })
        })
        it("should failed add new data to user carts with no token with status code 403", function(done){
            let data = {
                userId: userId,
                product : "5cb9c8441448fb65ada06974",
                stock: 10
            }
            chai
            .request(app)
            .post("/carts")
            .send(data)
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,403,"Token is undefined")
                done()
            });
        })
        it("should failed add new data validation problem status code 400", function(done){
            let data = {}
            chai
            .request(app)
            .post("/carts")
            .set({authorization:tokenCostumer})
            .send(data)
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,400,"validation")
                done()
            });
        })
    })
    describe("DELETE /carts", function(){
        it("Failed to Delete Cart: ID not found", function(done){
            chai
            .request(app)
            .delete(`/carts/5cbacfd089874a2327dc0327`)
            .set({authorization:tokenCostumer})
            .end(function(err,res){
                testFunction.errorTest(err,res,400,"Card id not found")
                done()
            })
        })
        it("failed delete when token is invalid/user not logged in", function(done){
            chai
            .request(app)
            .delete(`/products/5cbacfd089874a2327dc0327`)
            .set({authorization:""})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,403,"Token is undefined")
                done()
            })
        })
        it("failed delete when token is not admin", function(done){
            chai
            .request(app)
            .delete(`/products/${cartId}`)
            .set({authorization:tokenCostumer})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.errorTest(err,res,401,"Not Authorized")
                done()
            })
        })
        it("should success delete status:200", function(done){
            chai
            .request(app)
            .delete(`/carts/${cartId}`)
            .set({authorization:tokenCostumer})
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                testFunction.successTest(err,res)
                expect(res.body.message).to.equal("Delete Success")
                done()
            })
        })
    })
});

