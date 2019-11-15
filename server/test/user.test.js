const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Transaction = require('../models/transaction')
const {generateToken} = require('../helpers/jwt')
const expect = chai.expect

chai.use(chaiHttp)

//initial data user
let newUser = {
    username : 'depe',
    email : 'depe@email.com',
    password : 'password123',
    balance : 0,
    role : 'seller', 
}

let oldUser = {
    username : 'rizky',
    email : 'rizky@email.com',
    password : 'password123',
    balance : 0,
    role : 'seller', 
}

let otherUser = {
    username : 'penyusup',
    email : 'hacker@email.com',
    password : 'password123',
    balance : 0,
    role : 'seller', 
}

let oldBuyer = {
    username : 'rehan',
    email : 'rehan@email.com',
    password : 'password123',
    balance : 0,
    role : 'buyer', 
}

let product = {
    seller : oldUser.username,
    name : 'dummy product',
    image : 'random-link.jpg-aja',
    price : 1,
    stock : 1
}

let productError = {
    seller : oldUser.username,
    name : 'dummy product2',
    image : 'random-link2.jpg-aja',
    price : 2,
    stock : 2
}

//token
let token
let buyerToken
let otherToken
let falseToken = "eyJhbGciOiJUzINiIsInR5cCI6IpXVCJ9.eyJpZCI6IjVkY2E0Y2UxYjdiY2U3MjI0MmZkNTE1MCIsInVzZXJuYW1lIjoiYXNkIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTU3MzUzOTA0NX0.GiWoptx4FEjMpPgED08o7afXDUgzrm7iW50O2fLcleY"


//created product
let createdProduct

//middleware before

before(function(){
    User.create(oldUser)
    .then(data=>{
        token = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        return User.create(oldBuyer)
    })
    .then(data=>{
        buyerToken = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        return User.create(otherUser)
    })
    .then(data=>{
        otherToken = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        console.log('successfully created initial users, with it token')
    })
    .catch(err=>{
        console.log(err)
    })
})

//delete after testing

after(function(done){
    if(process.env.NODE_ENV === 'testing'){
        User.deleteMany({})
        .then(_=>{
            return Product.deleteMany({})
        })
        .then(_=>{
            return Cart.deleteMany({})
        })
        .then(_=>{
            return Transaction.deleteMany({})
        })
        .then(_=>{
            console.log('testing ended, dummy data deleted')
            done()
        })
        .catch(err=>{
            console.log(err)
        })
    }
})

describe('Register Routes Testing', function(){
    describe('POST /register', function(){
        describe('success response',function(){
            it('should send an object of new data users that register with status 201', function(done){
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('username', 'email', 'password', 'role', 'balance')
                    done()
                })
            })
        })
        describe('errors response',function(){
            it('should send status error 400 because missing name', function(done){
                newUser.username = ''
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('username is required')
                    done()
                })
            })
            it('should send status error 400 because missing email', function(done){
                newUser.email = ''
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('email is required')
                    done()
                })
            })
            it('should send status error 400 because missing password', function(done){
                newUser.password = ''
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('password is required')
                    done()
                })
            })
            it('should send status error 400 because missing role', function(done){
                newUser.role = ''
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('role is required')
                    done()
                })
            })
            it('should send status error 400 because duplicate username', function(done){
                newUser.username = 'rizky'
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('username already taken')
                    done()
                })
            })
            it('should send status error 400 because duplicate email', function(done){
                newUser.email = 'rizky@email.com'
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('email already taken')
                    done()
                })
            })
            it('should send status error 400 because wrong email format', function(done){
                newUser.email = 'rizkyemail.com'
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('format email wrong')
                    done()
                })
            })
            it('should send status error 400 because password less than 6 characters', function(done){
                newUser.password = 'qwe12'
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('less than 6 characters')
                    done()
                })
            })
            it('should send status error 400 because password must a mixed of number and letters', function(done){
                newUser.password = 'qweqwe'
                chai.request(app)
                .post('/register')
                .send(newUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('array').that.includes('password must a mixed of number and letters')
                    done()
                })
            })
        })
    })
})

describe('Login Routes Testing', function(){
    describe('POST /login', function(){
        describe('success response',function(){
            let loginNewUser = {
                email : newUser.email,
                password : newUser.password
            }
            it('should send an object of token an it payload from login with status 200', function(done){
                chai.request(app)
                .post('/login')
                .send(loginNewUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('token', 'payload')
                    expect(res.body.token).to.be.an('string')
                    expect(res.body.payload).to.be.an('object')
                    done()
                })
            })
        })
        describe('errors response',function(){
            let loginNewUser = {
                email : 'wrong@email.com',
                password : 'wrongp455'
            }
            it('should send status error 401 because email or password is false', function(done){
                chai.request(app)
                .post('/login')
                .send(loginNewUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('string').that.includes('Invalid Email/Password')
                    done()
                })
            })
        })
    })
})

describe('Users Routes Testing', function(){
    describe('POST/users', function(){
        describe('Success responses', function(){
            it('should send status 201 and show success msg and data of created product', function(done){
                chai.request(app)
                .post('/users')
                .send(product)
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('msg','data')
                    done()
                })
            })
            describe('errors response',function(){
                it('should send status error 401 because no token / false token', function(done){
                    chai.request(app)
                    .post('/users')
                    .send(product)
                    .set('token', falseToken || '')
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.any.keys('code', 'message')
                        expect(res.body.message).to.be.an('string').that.includes('Not Login')
                        done()
                    })
                })
                it('should send status error 403 because role is not seller', function(done){
                    chai.request(app)
                    .post('/users')
                    .send(product)
                    .set('token', buyerToken)
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.any.keys('code', 'message')
                        expect(res.body.message).to.be.an('string').that.includes('Not a Seller')
                        done()
                    })
                })
                it('should send status error 400 because missing seller', function(done){
                    productError.seller = ''
                    chai.request(app)
                    .post('/users')
                    .send(productError)
                    .set('token', token)
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.any.keys('code', 'message')
                        expect(res.body.message).to.be.an('array').that.includes('seller is required')
                        done()
                    })
                })
                it('should send status error 400 because missing name', function(done){
                    productError.name = ''
                    chai.request(app)
                    .post('/users')
                    .send(productError)
                    .set('token', token)
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.any.keys('code', 'message')
                        expect(res.body.message).to.be.an('array').that.includes('name is required')
                        done()
                    })
                })
                it('should send status error 400 because missing price', function(done){
                    productError.price = ''
                    chai.request(app)
                    .post('/users')
                    .send(productError)
                    .set('token', token)
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.any.keys('code', 'message')
                        expect(res.body.message).to.be.an('array').that.includes('price is required')
                        done()
                    })
                })
                it('should send status error 400 because missing stock', function(done){
                    productError.stock = ''
                    chai.request(app)
                    .post('/users')
                    .send(productError)
                    .set('token', token)
                    .end(function(err, res){
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.any.keys('code', 'message')
                        expect(res.body.message).to.be.an('array').that.includes('stock is required')
                        done()
                    })
                })
            })
        })
    })
    describe('GET/users', function(){
        describe('Success responses', function(){
            it('should send status 200 and show list users product if the role is seller', function(done){
                chai.request(app)
                .get('/users')
                .set('token', token)
                .end(function(err, res){
                    createdProduct = res.body[0]
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
        describe('errors response',function(){
            it('should send status error 401 because no token / false token', function(done){
                chai.request(app)
                .post('/users')
                .send(product)
                .set('token', falseToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('string').that.includes('Not Login')
                    done()
                })
            })
        })
    })
    describe('GET/users/profile', function(){
        describe('Success responses', function(){
            it('should send status 200 and show selected users profile', function(done){
                chai.request(app)
                .get('/users/profile')
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('username','email','password','role','ProductsId')
                    done()
                })
            })
        })
        describe('errors response',function(){
            it('should send status error 401 because no token / false token', function(done){
                chai.request(app)
                .get('/users/'+createdProduct._id)
                .set('token', falseToken || '')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code','message')
                    expect(res.body.message).to.be.an('string').that.includes('Not Login')
                    done()
                })
            })
        })
    })
    describe('PATCH/users/:id', function(){
        describe('Success responses', function(){
            it('should send status 200 and show updated users product if the role is seller', function(done){
                product.name='ini di update'
                chai.request(app)
                .patch('/users/'+createdProduct._id)
                .send(product)
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('msg','data')
                    done()
                })
            })
        })
        describe('errors response',function(){
            it('should send status error 401 because no token / false token', function(done){
                chai.request(app)
                .patch('/users/'+createdProduct._id)
                .send(product)
                .set('token', falseToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('string').that.includes('Not Login')
                    done()
                })
            })
            it('should send status error 403 because not authorized', function(done){
                chai.request(app)
                .patch('/users/'+createdProduct._id)
                .send(product)
                .set('token', otherToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code','message')
                    expect(res.body.message).to.be.an('string').that.includes('Not Authorized')
                    done()
                })
            })
        })
    })
    describe('DELETE/users/:id', function(){
        describe('errors response',function(){
            it('should send status error 401 because no token / false token', function(done){
                chai.request(app)
                .delete('/users/'+createdProduct._id)
                .set('token', falseToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code', 'message')
                    expect(res.body.message).to.be.an('string').that.includes('Not Login')
                    done()
                })
            })
            it('should send status error 403 because not authorized', function(done){
                chai.request(app)
                .delete('/users/'+createdProduct._id)
                .set('token', otherToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code','message')
                    expect(res.body.message).to.be.an('string').that.includes('Not Authorized')
                    done()
                })
            })
        })
        describe('Success responses', function(){
            it('should send status 200 and show deleted users product if the role is seller', function(done){
                chai.request(app)
                .delete('/users/'+createdProduct._id)
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('msg','data')
                    done()
                })
            })
        })
    })
})

