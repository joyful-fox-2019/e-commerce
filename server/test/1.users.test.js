const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user.js");

// Use Chai HTTP
chai.use(chaiHttp);
const expect = chai.expect;

// Declare Request Body
let userSignUp = {
    email: "arya@stark.com",
    password: "arya1234",
    name: "Arya Stark",
    address: "Winterfell",
    phone_number: "08997774489"
};

let userSignIn = {
    email: userSignUp.email,
    password: userSignUp.password
};

// Hooks before doing testing
before(function(done) {
    User.create({
        email: "edirates@gmail.com",
        password: "edison1234",
        name: "Edison",
        address: "Hacktiv8",
        phone_number: "08117489898",
        balance: 0,
        privilege: "admin"
    })
    .then((user) => {
        return User.create({
            email: "jon@snow.com",
            password: "jonsnow1234",
            name: "Jon Snow",
            address: "Night Watch",
            phone_number: "08987489898",
            balance: 0,
            privilege: "user"
        });
    })
    .then((user) => {
        console.log(`Initial users created.`);
        done();
    })
    .catch((err) => {
        console.log(err);
    });
});

// // Delete record after testing
// after(function(done) {
//     if (process.env.NODE_ENV === "testing") {
//         User.deleteMany()
//         .then((deleted) => {
//             console.log(`All records deleted.`);
//             done();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }
// });

describe("User Routing Tests", function() {
    describe("POST /users/signup", function() {
        describe("Success Response", function() {
            it("Should return an object value contains jwt_token with HTTP status code 201", function(done) {
                chai.request(app)
                .post("/users/signup")
                .send(userSignUp)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object").to.have.any.keys("user_data","jwt_token");
                    done();
                });
            });
        });
        describe("Error Responses", function() {
            it("Should return an error with HTTP status code 400 because of empty email value", function(done) {
                const emptyEmail = { ...userSignUp };
                emptyEmail.email = "";
                chai.request(app)
                .post("/users/signup")
                .send(emptyEmail)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Email is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of invalid email format", function(done) {
                const invalidEmail = { ...userSignUp };
                invalidEmail.email = "tester.com";
                chai.request(app)
                .post("/users/signup")
                .send(invalidEmail)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Invalid email format");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of duplicate email value", function(done) {
                chai.request(app)
                .post("/users/signup")
                .send(userSignUp)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Email must be unique");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty password value", function(done) {
                const emptyPassword = { ...userSignUp };
                emptyPassword.password = "";
                chai.request(app)
                .post("/users/signup")
                .send(emptyPassword)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Password is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of password length below 8", function(done) {
                const lessPassword = { ...userSignUp };
                lessPassword.password = lessPassword.password.slice(7);
                chai.request(app)
                .post("/users/signup")
                .send(lessPassword)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Password length at least 8 characters");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty name value", function(done) {
                const emptyName = { ...userSignUp };
                emptyName.name = "";
                chai.request(app)
                .post("/users/signup")
                .send(emptyName)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Name is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty address value", function(done) {
                const emptyAddress = { ...userSignUp };
                emptyAddress.address = "";
                chai.request(app)
                .post("/users/signup")
                .send(emptyAddress)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Address is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of empty phone number value", function(done) {
                const emptyPhone = { ...userSignUp };
                emptyPhone.phone_number = "";
                chai.request(app)
                .post("/users/signup")
                .send(emptyPhone)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Phone number is required");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of phone number length below 10", function(done) {
                const lessPhone = { ...userSignUp };
                lessPhone.phone_number = lessPhone.phone_number.slice(9);
                chai.request(app)
                .post("/users/signup")
                .send(lessPhone)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Phone number length at least 10 characters");
                    done();
                });
            });
            it("Should return an error with HTTP status code 400 because of duplicate phone number value", function(done) {
                chai.request(app)
                .post("/users/signup")
                .send(userSignUp)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.be.an("array").that.includes("Phone number must be unique");
                    done();
                });
            });
        });
    });
    describe("POST /users/signin", function() {
        describe("Success Response", function() {
            it("Should return an object value contains jwt_token with HTTP status code 200", function(done) {
                chai.request(app)
                .post("/users/signin")
                .send(userSignIn)
                .end( function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object").to.have.any.keys("user_data","jwt_token");
                    done();
                });
            });
        });
        describe("Error Responses", function() {
            it("Should return an error with HTTP status code 404 because of empty email value", function(done) {
                const emptyEmail = { ...userSignIn };
                emptyEmail.email = "";
                chai.request(app)
                .post("/users/signin")
                .send(emptyEmail)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.equal("User not found");
                    done();
                });
            });
            it("Should return an error with HTTP status code 404 because email is not found", function(done) {
                const invalidEmail = { ...userSignIn };
                invalidEmail.email = "tester@mail.com";
                chai.request(app)
                .post("/users/signin")
                .send(invalidEmail)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.equal("User not found");
                    done();
                });
            });
            it("Should return an error with HTTP status code 404 because password is not match", function(done) {
                const wrongPassword = { ...userSignIn };
                wrongPassword.password = "changepass";
                chai.request(app)
                .post("/users/signin")
                .send(wrongPassword)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an("object").to.have.any.keys("message");
                    expect(res.body.message).to.equal("Password not match");
                    done();
                });
            });
        });
    });
});