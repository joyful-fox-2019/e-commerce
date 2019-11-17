const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

let duplicateMail = {
    email: "rendo@mail.com",
    password: "12345",
    username: 'rendo'
}
let duplicateUsername = {
    email: "rendo23@mail.com",
    password: "12345",
    username: 'rendo'
}
let invalidMail = {
    email: "hardhimmail.com",
    password: "12345",
    username: 'hardhim'
}
let invalidPassword = {
    email: "popori@mail.com",
    password: "1234",
    username: 'popori'
}
let invalidUsername = {
    email: "tia@mail.com",
    password: "12345",
    username: 'tia'
}
let invalidUsername2 = {
    email: "tia@mail.com",
    password: "12345",
    username: 'aaaaaaaaaaaaa'
}

describe("Register user", function(){
    describe("Duplicate email", function() {
        it("should return error when email is duplicate", function(done){
            chai.request(app)
            .post('/register')
            .send(duplicateMail)
            .end(function (err, res) {
                expect(err);
                expect(res).to.have.status(500)
                done();
            })
        })
    })
    describe("Duplicate username", function() {
        it("should return error when username already taken", function(done){
            chai.request(app)
            .post('/register')
            .send(duplicateUsername)
            .end(function (err, res) {
                expect(err);
                expect(res).to.have.status(500)
                done();
            })
        })
    })
    describe("Invalid email", function() {
        it("should return error when email is invalid", function(done){
            chai.request(app)
            .post('/register')
            .send(invalidMail)
            .end(function (err, res) {
                expect(err);
                expect(res).to.have.status(400)
                done();
            })
        })
    })
    describe("Invalid password", function() {
        it("should return error when password less than 5", function(done){
            chai.request(app)
            .post('/register')
            .send(invalidPassword)
            .end(function (err, res) {
                expect(err);
                expect(res).to.have.status(400)
                done();
            })
        })
    })
        describe("Invalid username", function() {
        it("should return error when username less than 4", function(done){
            chai.request(app)
            .post('/register')
            .send(invalidUsername)
            .end(function (err, res) {
                expect(err);
                expect(res).to.have.status(400)
                done();
            })
        })
    })
    describe("Invalid username2", function() {
        it("should return error when usernamemore than 12", function(done){
            chai.request(app)
            .post('/register')
            .send(invalidUsername2)
            .end(function (err, res) {
                expect(err);
                expect(res).to.have.status(400)
                done();
            })
        })
    })
})
