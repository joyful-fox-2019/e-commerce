const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/user')
const expect = chai.expect;
const app = require('../app')

chai.use(chaiHttp)

let newUser = {
    username: "nezuko",
    email: "nezuko@gmail.com",
    password: "nezuko123"
}

let userLogin = {
    email: newUser.email,
    password: newUser.password
}

before(function () {
    const data = {
        username: "tanjiro",
        email: "tanjiro@gmail.com",
        password: "tanjiro123"
    }
    User.create(data)
        .then(user => {
            console.log('testing : success to initialize new user')
        })
        .catch(err => {
            console.log(err)
        })
})

after(function () {
    if (process.env.NODE_ENV === 'testing') {
        User.deleteMany({})
            .then(success => {
                console.log('Drop all user after testing success')
            })
            .catch(err => {
                console.log(err)
            })
    }
})


describe("User Testing", function () {
    describe('#signUp success condition', function () {
        it('should send an object with key (username, email, password) with status code 201', function (done) {
            chai.request(app)
                .post('/user/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object').to.have.any.keys('username', 'email', 'password')
                    done()
                })
        })
    })

    describe('#signup error condition', function () {
        it('should be return error your email is not valid', function (done) {
            let errorUser = {
                username: "danang",
                email: "danang@com",
                password: "danang123"
            }
            chai.request(app)
                .post('/user/register')
                .send(errorUser)
                .end(function (err, res) {
                    console.log(res.body.message)
                    expect(err).to.be.null
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.be.an('array').that.include('Your email is not valid')
                    done()
                })
        })
        it('should be return error, password must have min length 8', function (done) {
            chai.request(app)
                .post('/user/register')
                .send({
                    username: "danang",
                    email: "danangbahari@gmail.com",
                    password: "dan"
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.be.an('array').that.include('Password minimal 8 digits')
                    done()
                })
        })
        it('should be return error, username cannot be empty', function (done) {
            let errorUser = {
                username: "",
                email: "danangbahari11@gmail.com",
                password: "danang123"
            }
            chai.request(app)
                .post('/user/register')
                .send(errorUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.be.an('array').that.include('username cannot be empty')
                    done()
                })
        })
        it('should be return error, email cannot be empty', function (done) {
            let errorUser = {
                username: "dananguu",
                email: "",
                password: "danang123"
            }
            chai.request(app)
                .post('/user/register')
                .send(errorUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.be.an('array').that.include('email cannot be empty')
                    done()
                })
        })
        it('should be return error, password cannot be empty', function (done) {
            let errorUser = {
                username: "dananguta",
                email: "danangbahari12@gmail.com",
                password: ""
            }
            chai.request(app)
                .post('/user/register')
                .send(errorUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.be.an('array').that.include('password cannot be empty')
                    done()
                })
        })
        it("should be return error, your email is already register", function (done) {
            let errorUser = {
                username: "okeokeoke",
                email: newUser.email,
                password: "rahasia saja dong"
            }
            chai.request(app)
                .post('/user/register')
                .send(errorUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message', 'Your email is already register')
                    done()
                })
        })
    })

    describe('#signin success condition', function () {
        it('should be return token and username of user', function (done) {
            chai.request(app)
                .post('/user/login')
                .send(userLogin)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("token");
                    expect(res.body).to.have.property("username");
                    done()
                })
        })
    })
    describe('#signin error condition', function () {
        it('should be return error, your email is not registered', function (done) {
            let errorUser = {
                email: "adadadada@gmail.com",
                password: "rahasiadong"
            }
            chai.request(app)
                .post('/user/login')
                .send(errorUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message', 'Your email is not registered')
                    done()
                })
        })
        it('should be return error, your password is wrong', function (done) {
            let errorUser = {
                email: newUser.email,
                password: "passwordNgawur"
            }
            chai.request(app)
                .post('/user/login')
                .send(errorUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('message', 'Your password is wrong')
                    done()
                })
        })
    })
})