const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

describe('User Routes', function() {
    let newUser = {
        name: 'Gintoki',
        email: 'gintoki@mail.com',
        password: 'gintoki',
        address: 'Edo'
    }
    this.timeout(5000)

    //Testing for => POST /register
    describe('POST /register', function() {
        describe('SuccessProcess', function() {
            it('Should send an object (token, msg) with 201 status code', function(done) {
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('token', 'msg')
                    expect(res.body.msg).to.equal('Successfully Registered')
                    done()
                })
            })
        })

        describe('ErrorProcess', function() {
            it('Should send an error with 400 status code because missing name value', function(done) {
                const withoutName = { ...newUser }
                delete withoutName.name
                chai.request(app)
                .post('/register')
                .send(withoutName)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Name is required')
                    done()
                })
            })

            it('Should send an error with 400 status code because missing email value', function(done) {
                const withoutEmail = { ...newUser }
                delete withoutEmail.email
                chai.request(app)
                .post('/register')
                .send(withoutEmail)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Email is required')
                    done()
                })
            })

            it('Should send an error with 400 status code because missing password value', function(done) {
                const withoutPassword = { ...newUser }
                delete withoutPassword.password
                chai.request(app)
                .post('/register')
                .send(withoutPassword)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Password is required')
                    done()
                })
            })

            it('Should send an error with 400 status code because missing address value', function(done) {
                const withoutAddress = { ...newUser }
                delete withoutAddress.address
                chai.request(app)
                .post('/register')
                .send(withoutAddress)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Address is required')
                    done()
                })
            })

            it('Should send an error with 400 status code because invalid email format', function(done) {
                const falseEmailFormat = { ...newUser }
                falseEmailFormat.email = 'ericmastervue.com'
                chai.request(app)
                .post('/register')
                .send(falseEmailFormat)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Invalid email format')
                    done()
                })
            })

            it('Should send an error with 400 status code because of passwords min char validation', function(done) {
                const falsePasswordFormat = { ...newUser }
                falsePasswordFormat.password = '1'
                chai.request(app)
                .post('/register')
                .send(falsePasswordFormat)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
                    expect(res.body.msg).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Minimum of passwords length is 6')
                    done()
                })
            })
        })
        
    })

    describe('POST /login', function() {
        let userSignIn = {
            email: newUser.email,
            password: newUser.password
        }
        describe('SuccessProcess', function() {
            it('Should send an object (token, msg) with 200 status code', function(done) {
                chai.request(app)
                .post('/login')
                .send(userSignIn)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('token', 'msg')
                    expect(res.body.msg).to.equal('Logged in')
                    done()
                })
            })
        })

        describe('ErrorProcess', function() {
            it('Should send an error with 400 status code because missing email value', function(done) {
                const withoutEmail = { ...userSignIn }
                delete withoutEmail.email
                chai.request(app)
                .post('/login')
                .send(withoutEmail)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('token', 'msg')
                    expect(res.body.msg).to.equal('Bad Request')
                    done()
                })
            })
        })

        describe('ErrorProcess', function() {
            it('Should send an error with 400 status code because missing password value', function(done) {
                const withoutPassword = { ...userSignIn }
                delete withoutPassword.password
                chai.request(app)
                .post('/login')
                .send(withoutPassword)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('token', 'msg')
                    expect(res.body.msg).to.equal('Bad Request')
                    done()
                })
            })
        })

        describe('ErrorProcess', function() {
            it('Should send an error with 500 status code because invalid(wrong) email value', function(done) {
                const falseEmail = { ...userSignIn }
                falseEmail.email = 'katsura@mail.com'
                chai.request(app)
                .post('/login')
                .send(falseEmail)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg')
                    expect(res.body.msg).to.equal('Internal Server Error')
                    done()
                })
            })
        })

        describe('ErrorProcess', function() {
            it('Should send an error with 400 status code because invalid(wrong) password value', function(done) {
                const falsePassword = { ...userSignIn }
                falsePassword.password = 'katsura'
                chai.request(app)
                .post('/login')
                .send(falsePassword)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('msg')
                    expect(res.body.msg).to.equal('Wrong email/password')
                    done()
                })
            })
        })
    })
})