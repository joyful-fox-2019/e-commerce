const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const {generateToken} = require('../helpers/jwt')
const expect = chai.expect

chai.use(chaiHttp)

//user
let user = {
    username : 'papa',
    email : 'pepe@email.com',
    password : 'password123',
    balance : 1,
    role : 'seller', 
}

let buyer = {
    username : 'wapa',
    email : 'wapa@email.com',
    password : 'password123',
    balance : 9999,
    role : 'buyer', 
}

let failBuyer = {
    username : 'wapawapa',
    email : 'wapawapa@email.com',
    password : 'password123',
    balance : 0,
    role : 'buyer', 
}

let poorBuyer = {
    username : 'wepewapa',
    email : 'wepewapa@email.com',
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
    stock : 999
}

let outOfStock = {
    seller : user.username,
    name : 'dummy product',
    description : 'deskripsi',
    image : 'random-link.jpg-aja',
    price : 1,
    stock : 0
}

let toExpensive = {
    seller : user.username,
    name : 'dummy product',
    description : 'deskripsi',
    image : 'random-link.jpg-aja',
    price : 99999999,
    stock : 999999
}


//createdProduct
let createdProduct
let createdOutOfStock
let createdExpensive

//token
let token
let failToken
let poorToken

//cart
let cart
let cartOutOfStock
let cartExpensive

before(function(done){
    Product.create(product)
    .then(data=>{
        createdProduct=data
        return User.create(buyer)
    })
    .then(data=>{
        token = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        return Cart.create({UserId : data._id, ProductId : createdProduct._id, amount : 1})
    })
    .then(data=>{
        cart = data
        return Product.create(outOfStock)
    })
    .then(data=>{
        createdOutOfStock=data
        return User.create(failBuyer)
    })
    .then(data=>{
        failToken = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        return Cart.create({UserId : data._id, ProductId : createdOutOfStock._id, amount : 99})
    })
    .then(data=>{
        cartOutOfStock = data
        return Product.create(toExpensive)
    })
    .then(data=>{
        createdExpensive = data
        return User.create(poorBuyer)
    })
    .then(data=>{
        poorToken = generateToken({
            id : data._id,
            username : data.username,
            role : data.role
        })
        return Cart.create({UserId : data._id, ProductId : createdExpensive._id, amount : 1})
    })
    .then(data=>{
        cartExpensive = data
        done()
    })
    .catch(err=>{
        console.log(err)
    })
})

describe('Transactions Routes Testing', function(){
    describe('GET /transactions', function(){
        describe('success response',function(){
            it('should show list of products in users cart that will go to transaction models with status 200', function(done){
                chai.request(app)
                .get('/transactions')
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('listedItem','outOfStock','totalCost', 'balance')
                    done()
                })
            })
        })
    })
    describe('GET /transactions/purchased', function(){
        describe('success response',function(){
            it('should show list of all buyer transactions in database with status 200', function(done){
                chai.request(app)
                .get('/transactions/purchased')
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
    })
    describe('GET /transactions/sold', function(){
        describe('success response',function(){
            it('should show list of all seller transactions in database with status 200', function(done){
                chai.request(app)
                .get('/transactions/sold')
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
    })
    describe('POST /transactions', function(){
        describe('success response',function(){
            it('should post cart to trasanctions model with status 200', function(done){
                chai.request(app)
                .post('/transactions')
                .send(cart)
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('msg','dataTransaction')
                    done()
                })
            })
        })
        describe('error response',function(){
            it('should send status 400 because product is out of stock', function(done){
                chai.request(app)
                .post('/transactions')
                .send(cartOutOfStock)
                .set('token', failToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code','message')
                    expect(res.body.message).to.be.an('string').that.includes('transaction failed, not enough quantity stock for the items')
                    done()
                })
            })
            it('should send status 400 because not enough balance', function(done){
                chai.request(app)
                .post('/transactions')
                .send(cartExpensive)
                .set('token', poorToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.any.keys('code','message')
                    expect(res.body.message).to.be.an('string').that.includes('transaction failed, not enough balance')
                    done()
                })
            })
        })
    })
    describe('PATCH /transactions/:id', function(){
        describe('success response',function(){
            it('patch transactions status to true 200', function(done){
                chai.request(app)
                .patch('/transactions/'+createdProduct._id)
                .set('token', token)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.any.keys('msg','data')
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })
    })
})