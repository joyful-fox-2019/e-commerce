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
    username : 'pepe',
    email : 'pepe@email.com',
    password : 'password123',
    balance : 0,
    role : 'seller', 
}

let buyer = {
    username : 'wepe',
    email : 'wepe@email.com',
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

//token
let token

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
        console.log('success initialize dummy data')
        done()
    })
    .catch(err=>{
        console.log(err)
    })
})

describe('Carts Routes Testing', function(){
    describe('GET /carts', function(){
        describe('success response',function(){
            it('should show list of products in users cart with status 200', function(done){
                chai.request(app)
                .get('/carts')
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
})