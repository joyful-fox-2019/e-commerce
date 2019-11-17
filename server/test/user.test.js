const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

describe('User Routes', function () {
    this.timeout(10000)

    let newUser = {
        username: 'user',
        email: 'user@mail.com',
        password: 'user'
    }

    after(function (done) {
        User.deleteManyn({})
            .then(result => done())
            .catch(console.log)
    })

    describe('POST user/register', () => {
        //success register
        describe(`success registered! \(^ヮ^)/`, () => {

            it('customer success registered', (done) => {
                chai.request(app)
                    .post(`/user/register`)
                    .send(newUser)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.all.keys('message', 'newUser')
                        expect(res.body.newUser).to.be.an('Object').to.have.all.keys('_id', 'username', 'email', 'password', 'cart', 'isAdmin')
                        expect(res.body.newUser.password).to.be.not.equal(newUser.password)
                        expect(res.body.message).to.equal('successful register')
                        done()
                    })
            })
            it('admin success registered', function (done) {
                let newAdmin = { ...newUser, isAdmin: true, email: 'admin@mail.com' }
                chai.request(app)
                    .post(`/user/register`)
                    .send(newAdmin)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.all.keys('message', 'newUser')
                        expect(res.body.newUser).to.be.an('Object').to.have.all.keys('_id', 'username', 'email', 'password', 'cart', 'isAdmin')
                        expect(res.body.newUser.password).to.be.not.equal(newUser.password)
                        expect(res.body.message).to.equal('successful register')
                        done()
                    })
            })
        })

        describe(`failed registered! (-__-)`, () => {

            it('user failed registered : empty username', (done) => {
                let userFail = { ...newUser }
                delete userFail.username
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter your username')
                        done()
                    })
            })

            it('user failed registered : empty email', (done) => {
                let userFail = { ...newUser }
                delete userFail.email
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter your email address.')
                        done()
                    })
            })

            it('user failed registered : empty password', (done) => {
                let userFail = { ...newUser }
                delete userFail.password
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter your password')
                        done()
                    })
            })

            it('user failed registered : email has already been registered before', (done) => {
                let userFail = { ...newUser }
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('email already registered')
                        done()
                    })
            })

            it('user failed registered : invalid email format', (done) => {
                let userFail = { ...newUser, email: "failed.com" }
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter a valid email address')
                        done()
                    })
            })

        })

    })

    describe('POST /user/login', () => {
        describe(`success log in \(^ヮ^)/`, () => {
            it('user success log in, supposed to return a token', (done) => {
                let userLogin = { ...newUser }
                delete userLogin.username
                chai.request(app)
                    .post(`/user/login`)
                    .send(userLogin)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Object').to.have.all.keys('token', 'user')
                        expect(res.body.user).to.be.an('Object').to.have.all.keys('id', 'username', 'email', 'cart', 'isAdmin')
                        done()
                    })
            })
        })

        describe(`failed log in (-__-)`, () => {
            it('user failed log in : invalid email', (done) => {
                let userFail = { ...newUser, email: "failed.com" }
                chai.request(app)
                    .post(`/user/login`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })

            it('user failed log in : invalid password', (done) => {
                let userFail = { ...newUser, password: "failed" }
                chai.request(app)
                    .post(`/user/login`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })
        })
    })



})