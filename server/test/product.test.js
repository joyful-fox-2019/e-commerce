const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')
const {generateToken} = require('../helpers/jwt')
const expect = chai.expect

chai.use(chaiHttp)

//user
let user = {
    username : 'depepe',
    email : 'depepe@email.com',
    password : 'password123',
    balance : 0,
    role : 'seller', 
}

let buyer = {
    username : 'dewepe',
    email : 'dewepe@email.com',
    password : 'password123',
    balance : 0,
    role : 'buyer', 
}

//product
let product = {
    seller : user.username,
    name : 'dummy product',
    description : 'deskripsi',
    image : 'random-link.jpg-aja',
    price : 1,
    stock : 1
}

//search
let filter = 'dummy'

//created in database
let createdProduct

//token
let buyerToken

before(function(){
    Product.create(product)
    .then(data=>{
        createdProduct=data
        return User.create(buyer)
    })
    .then(data=>{
        buyerToken = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        console.log('success initialize dummy data')
    })
    .catch(err=>{
        console.log(err)
    })
})

describe('Products Routes Testing', function(){
    describe('GET /products', function(){
        describe('success response',function(){
            it('should show list of products in database with status 200', function(done){
                chai.request(app)
                .get('/products')
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
    })
    describe('GET /products/:id', function(){
        describe('success response',function(){
            it('should show selected products in database with status 200', function(done){
                chai.request(app)
                .get('/products/'+createdProduct._id)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })
    })
    describe('GET /products/?search', function(){
        describe('success response',function(){
            it('should list of searched products in database with status 200', function(done){
                chai.request(app)
                .get('/products/search?filter='+filter)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
    })
    describe('PATCH /products/add/:id', function(){
        describe('success response',function(){
            it('should add product to cart', function(done){
                chai.request(app)
                .patch('/products/add/'+createdProduct._id)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('amount','_id','UserId','ProductId')
                    done()
                })
            })
        })
        describe('errors response',function(){
            it('should send status error 401 because no token', function(done){
                chai.request(app)
                .patch('/products/add/'+createdProduct._id)
                .send(product)
                .set('token', '')
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
    describe('PATCH /products/remove/:id', function(){
        describe('success response',function(){
            it('should remove product to cart', function(done){
                chai.request(app)
                .patch('/products/remove/'+createdProduct._id)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('amount','_id','UserId','ProductId')
                    done()
                })
            })
        })
        describe('errors response',function(){
            it('should send status error 401 because no token', function(done){
                chai.request(app)
                .patch('/products/remove/'+createdProduct._id)
                .send(product)
                .set('token', '')
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
})