const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const userDrop = require("../helpers/userDrop")

chai.use(chaiHttp);

before(function(done) {
    userDrop(done);
});
  
after(function(done) {
    userDrop(done);
});

var token;

describe("User Route Testing", function () {
    describe("GET /users/profile", function(){
        it("Get Profile with status 200", function(done){
            chai
            .request(app)
            .get("/users/profile")
            .set({authorization:token})
            .end(function(err, res){
                console.log(JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("imageUrl", "accountType","name","balance","role")
                done()
            })
        })
    })
    describe("POST /users/login", function(){
        it("Success login: should respon with token, name, imgSrc", function(done){
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
                console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("token","name","imageUrl","role","balance")
                token = res.body.token
                done();
            })
        })
        it("Login Failed: wrong email with status 400", function(done){
            let user = {
                "email": "random@email.com",
                "password": "12345",
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Email is Invalid!")
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                done();
            })
        })
        it("Login Failed: wrong password with status 400", function(done){
            let user = {
                "email": "hengki@gmail.com",
                "password": "pas",
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                 console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Password is Invalid!")
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                done();
            })
        })
    });
    describe(" POST /users/register", function () {
        it("should successfully register new user with status 201", function (done) {
            let user = {
                name: "hengki",
                email: "hengki10@gmail.com",
                password: "hengki10"
            };

            chai
            .request(app)
            .post("/users/register")
            .send(user)
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body.name).to.equal("hengki")
                expect(res.body).to.have.keys(['token','name',"imageUrl","role","balance"]);
                done()
            });
        });
        it("should error with error code 400", function(done){
            let emptyUser = {}
            chai
            .request(app)
            .post("/users/register")
            .send(emptyUser)
            .end(function(err, res){
                console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                expect(res.body.message).to.include('validation')
                done()
            })
        })
        it("should success register admin with status 201 with no error", function(done){
            let user = {
                name: "admin",
                email: "admin@email.com",
                password: "12345",
                admin_password: "adminAdMiN"
            }
            chai
            .request(app)
            .post("/users/register")
            .send(user)
            .end(function (err, res) {
                 console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body.name).to.equal("marchell")
                expect(res.body).to.have.keys(['token','name',"imageUrl","role","balance"]);
                done()
            });
        })
        it("should failed register admin (wrong admin password) with status 400", function(done){
            let user = {
                name: "admin",
                email: "admin2@email.com",
                password: "12345",
                admin_password: "paswordsalah"
            }
            chai
            .request(app)
            .post("/users/register")
            .send(user)
            .end(function (err, res) {
                console.log(JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                expect(res.body.message).to.include('Incorrect password for register as admin')
                done()
            });
        })
    });
});