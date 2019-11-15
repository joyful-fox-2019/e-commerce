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
    balance : 1,
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

//token
let token

//cart
let cart

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
                    expect(res.body).to.any.keys('listedItem','outOfStock','totalCost')
                    done()
                })
            })
        })
    })
    describe('GET /transactions/history', function(){
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
    })
})