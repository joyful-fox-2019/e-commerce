const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

before(function (done) {
    const data = {
        username: 'testing',
        email: 'testing@localhost.com',
        password: '12345'
    }
    User.create(data)
        .then(user => {
            console.log('before: create success')
            done()
        })
        .catch(console.log)
})

after(function (done) {
    if (process.env.NODE_ENV === 'testing') {
        User.deleteMany({})
            .then(() => {
                console.log('after: delete success')
                done()
            })
            .catch(console.log)
    }
})

describe('User Routes', function () {
    describe('POST /register', function () {

        context('Success Response', function () {
            it('status code 201 and an object of user', function (done) {
                let user = {
                    email: "rendo@mail.com",
                    password: "12345",
                    username: 'rendo'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.any.keys('_id', 'username', 'email', 'password')
                        done()
                    })
            })
        })

        context('Errors Response', function () {
            it('status code 400 because of missing name value', function (done) {
                let user = {
                    email: "rendo12@mail.com",
                    password: "12345",
                    username: ""
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please input your name')
                        done()
                    })
            })
            it('status code 400 because of missing email value', function (done) {
                let user = {
                    email: "",
                    password: "12345",
                    username: "rendo12"
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter your email')
                        done()
                    })
            })
            it('status code 400 because of missing password value', function (done) {
                let user = {
                    email: "rendo12@mail.com",
                    password: "",
                    username: "rendo12"
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please input your password')
                        done()
                    })
            })
            it('status code 400 because of invalid email format', function (done) {
                let user = {
                    email: "rendomail.com",
                    password: "12345",
                    username: 'rendo12'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter a valid email')
                        done()
                    })
            })
            it('status code 400 because password less than 5 characters', function (done) {
                let user = {
                    email: "rendomail.com",
                    password: "123",
                    username: 'rendo12'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Password minimum 5 character')
                        done()
                    })
            })
            it('status code 400 because username less than 4 characters', function (done) {
                let user = {
                    email: "rendo@mail.com",
                    password: "12345",
                    username: 'ren'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        done()
                    })
            })
            it('status code 400 because username more than 12 characters', function (done) {
                let user = {
                    email: "rendo@mail.com",
                    password: "12345",
                    username: 'rendo123456789102'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        done()
                    })
            })
            it('status code 400 because of duplicate username', function (done) {
                let user = {
                    email: "rendo1111@mail.com",
                    password: "12345",
                    username: 'rendo'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        done()
                    })
            })
            it('status code 400 because of duplicate email', function (done) {
                let user = {
                    email: "rendo@mail.com",
                    password: "12345",
                    username: 'rendo14'
                }
                chai.request(app)
                    .post('/register')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
                        expect(res.body.message).to.equal('Validation Error')
                        done()
                    })
            })
        })
    })
    describe('POST /login', function () {
        context('Success Response', function () {
            it('status code 200 and an object of token', function (done) {
                let user = {
                    email: 'testing@localhost.com',
                    password: '12345'
                }
                chai.request(app)
                    .post('/login')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('token')
                        done()
                    })
            })
        })
        context('Errors Response', function () {
            it('status code 400 because of missing email value', function (done) {
                let user = {
                    email: '',
                    password: '12345'
                }
                chai.request(app)
                    .post('/login')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('Please enter your email')
                        done()
                    })
            })
            it('status code 400 because of missing password value', function (done) {
                let user = {
                    email: 'testing@localhost.com',
                    password: ''
                }
                chai.request(app)
                    .post('/login')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('Please enter your password')
                        done()
                    })
            })
            it('status code 401 because email is not yet registered', function (done) {
                let user = {
                    email: 'not_registered@localhost.com',
                    password: '12345'
                }
                chai.request(app)
                    .post('/login')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message).to.equal('Email is not registered')
                        done()
                    })
            })
            it('4. should send an error with 401 status code because password is incorrect for the respective email', function (done) {
                let user = {
                    email: 'testing@localhost.com',
                    password: 'wrong_password'
                }
                chai.request(app)
                    .post('/login')
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message).to.equal('Incorrect password')
                        done()
                    })
            })
        })
    })
})