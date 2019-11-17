const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const generateToken = require('../helpers/tokenMaker').generateToken
const decodeToken = require('../helpers/tokenMaker').decodeToken

chai.use(chaiHttp)
const expect = chai.expect

let newUser = {
    username: 'andreas',
    email: "andre@mail.com",
    password: 'qwe'
}
let userLogin = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password
}

let product = {
    product_id: '5dca8614fb55071d413b5c48',
    quantity: 1
}

let cart_id = {
    cart_id: '5dcba28ffc67b809fc48b706'
}

let token = ''

before(function() {
    const data = {
        username: 'milotic',
        email: "milotic@mail.com",
        password: '123'
    }
    User.create(data)
        .then( user => {
            token = generateToken({
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            })
            console.log('success generate token')
            console.log(`testing: success creating initial user`)
        })
        .catch(console.log)
})

after(function(done) {
    if(process.env.NODE_ENV === 'testing') {
        User.deleteMany({})
            .then(() => {
                console.log(`testing: success delete user data`)
                done()
            })
            .catch(console.log)
    }
})

describe('Users Endpoints', function() {
    describe('Register User', function() {
        describe('success process', function() {
            it('should return status 201 when sign up success', function(done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('token')
                        console.log(token)
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 400 when email format is invalid', function(done) {
                const invalidEmailFormat = { ...newUser, email: 'wrongFormatmail.com'}
                chai
                    .request(app)
                    .post('/users/register')
                    .send(invalidEmailFormat)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 when email is duplicated', function(done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 when username is duplicated', function(done) {
                const duplicatedUsername = { ...newUser, email: 'anothermail@mail.com'}

                chai
                    .request(app)
                    .post('/users/register')
                    .send(duplicatedUsername)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return status 400 when username is missing', function(done) {
                const missingUsername = { ...newUser}
                delete missingUsername.username
                chai
                    .request(app)
                    .post('/users/register')
                    .send(missingUsername)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
            it('should return status 400 when email is missing', function(done) {
                const missingEmail = { ...newUser}
                delete missingEmail.email
                chai
                    .request(app)
                    .post('/users/register')
                    .send(missingEmail)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
            it('should return status 400 when password is missing', function(done) {
                const missingPassword = { ...newUser}
                delete missingPassword.password
                chai
                    .request(app)
                    .post('/users/register')
                    .send(missingPassword)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array')
                        done()
                    })
            })
        })
    })
    describe('Sign In User', function() {
        describe('success process', function() {
            it('should return status 200 and token when sign in success', function(done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send(userLogin)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.own.property('token')
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 400 when email is missing', function(done) {
                const missingEmail = { ...userLogin }
                delete missingEmail.email
                chai
                    .request(app)
                    .post('/users/login')
                    .send(missingEmail)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            })
            it('should return status 400 when password is missing', function(done) {
                const missingPassword = { ...userLogin }
                delete missingPassword.password
                chai
                    .request(app)
                    .post('/users/login')
                    .send(missingPassword)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            }) 
            it('should return status 404 when entered a wrong email', function(done) {
                const wrongEmail = { ...userLogin }
                wrongEmail.email = 'lmfao@mail.com'
                chai
                    .request(app)
                    .post('/users/login')
                    .send(wrongEmail)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('Invalid Email or Password')
                        done()
                    })
            })
            it('should return status 404 when entered wrong password', function(done) {
                const wrongPassword = { ...userLogin }
                wrongPassword.password = 'rty'
                chai
                    .request(app)
                    .post('/users/login')
                    .send(wrongPassword)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('Invalid Email or Password')
                        done()
                    })
            })
            it('should return status 404 when entered a wrong email format', function(done) {
                const wrongEmailFormat = { ...userLogin }
                wrongEmailFormat.email = 'lmfaomailcom'
                chai
                    .request(app)
                    .post('/users/login')
                    .send(wrongEmailFormat)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.message).to.equal('Invalid Email or Password')
                        done()
                    })
            })
        })
        
    })
    describe('Add to cart', function() {
        describe('success process', function() {
            it('should return status 200', function(done) {
                chai
                    .request(app)
                    .patch('/users/cart')
                    .set('token', token)
                    .send(product)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 400 when product id is missing', function(done) {
                const missingProductId = { ...product }
                delete missingProductId.product_id
                chai
                    .request(app)
                    .patch('/users/cart')
                    .set('token', token)
                    .send(missingProductId)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            })
            it('should return status 400 when quantity is missing', function(done) {
                const missingQuantity = { ...product }
                delete missingQuantity.quantity
                chai
                    .request(app)
                    .patch('/users/cart')
                    .set('token', token)
                    .send(missingQuantity)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            })
            it('should return status 401 when token is missing', function(done) {
                chai
                    .request(app)
                    .patch('/users/cart')
                    .send(product)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message).to.equal('jwt must be provided')
                        done()
                    })
            })
        })
    })
    describe('Remove from cart', function() {
        describe('success process', function() {
            it('should return status 200', function(done) {
                chai
                    .request(app)
                    .patch('/users/cart/remove')
                    .set('token', token)
                    .send(cart_id)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 401 when token is missing', function(done) {
                chai
                    .request(app)
                    .patch('/users/cart')
                    .send(cart_id)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message).to.equal('jwt must be provided')
                        done()
                    })
            })
            it('should return status 400 when cart id is missing', function(done) {
                const noCartId = {...cart_id}
                delete noCartId.cart_id
                chai
                    .request(app)
                    .patch('/users/cart')
                    .set('token', token)
                    .send(noCartId)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('bad request')
                        done()
                    })
            })
        })
    })
    describe('View cart', function() {
        describe('success process', function() {
            it('should return status 200', function(done) {
                chai
                    .request(app)
                    .get('/users/cart')
                    .set('token', token)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function() {
            it('should return status 401 when token is missing', function(done) {
                chai
                    .request(app)
                    .get('/users/cart')
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message).to.equal('jwt must be provided')
                        done()
                    })
            })
        })
    })
})