const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

describe('User Routes', function () {
    this.timeout(100000)

    let newUser = {
        username: 'user',
        email: 'user1@mail.com',
        password: 'user'
    }

    let product = {
        product_id: '5dca8614fb55071d413b5c48',
        quantity: 1,
        name: 'product',
        stock: 10,
        description: 'this is product description',
        price: 5000,
        category: 'test'
    }

    let cart_id = '5dcba28ffc67b809fc48b706'

    let Admin = {
        username: 'user',
        email: 'user@mail.com',
        password: 'user',
        isAdmin: true
    }
    let Customer = {
        username: 'customer',
        email: 'customer@mail.com',
        password: 'customer',
        isAdmin: false
    }
    let createdProduct = {}

    let token = '',
        tokenCustomer = ''

    before(function (done) {
        User.create(Admin)
            .then(result => {
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Admin.email,
                        password: Admin.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            token = res.body.token
                        }
                    })
                return User.create(Customer)
            })
            .then(created => {
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Customer.email,
                        password: Customer.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            tokenCustomer = res.body.token
                            done()
                        }
                    })
            }).catch(console.log)
    })

    after(function (done) {
        User.deleteMany({})
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
                        expect(res).to.have.status(400)
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
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })
        })
    })

    describe('Add to cart', function () {
        describe('success \(^ヮ^)/', function () {
            it('should return status 200', function (done) {
                chai
                    .request(app)
                    .patch('/user/cart')
                    .set('token', token)
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
        describe(`failed! (-__-)`, function () {
            it('failed add to cart : no user login', function (done) {
                chai
                    .request(app)
                    .patch('/user/cart')
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
        })
    })
    describe('Remove from cart', function () {
        describe('success \(^ヮ^)/', function () {
            it('return state 200', function (done) {
                chai
                    .request(app)
                    .delete(`/user/cart/${cart_id}`)
                    .set('token', tokenCustomer)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
        describe(`failed! (-__-)`, function () {
            it('failed remove cart : no user login', function (done) {
                chai
                    .request(app)
                    .delete(`/user/cart/${cart_id}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
        })
    })
    describe('View cart', function () {
        describe('success \(^ヮ^)/', function () {
            it('should return status 200', function (done) {
                chai
                    .request(app)
                    .get('/user/cart')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })
            })
        })
        describe(`failed! (-__-)`, function () {
            it('failed view cart : token is missing', function (done) {
                chai
                    .request(app)
                    .get('/user/cart')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
        })
    })


})