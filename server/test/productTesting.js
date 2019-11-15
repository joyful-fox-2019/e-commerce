const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const ProductModel = require('../models/product')
const UserModel = require('../models/user')
const passwordHasher = require('../helpers/passwordGenerator').hashPassword
const app = require('../app')
let tokenUser = ''
let productId = ''
let tokenCustomer = ''

chai.use(chaiHttp)

before(function(done){
    UserModel.create({
        fullname : 'testing',
        email : 'testing@mail.com',
        password : passwordHasher('testing'),
        role : 'admin'
    })
    .then(user => {
        console.log(user, '------ user created -----')
        UserModel.create({
            fullname : 'customer',
            email : 'customer@mail.com',
            password : passwordHasher('customer'),
            role : 'customer'
        })
        .then(user => {
            console.log(user, '------ customer created -----')
        })
        .catch(err => {
            console.log(err)
        })
        done()
    })
    .catch(err => {
        console.log(err)
    })
    
})



after(function(done){
    UserModel.deleteMany()
    .then(_ =>{
        return ProductModel.deleteMany()  
    })
    .then(_ =>{
        console.log('validation testing completed')
        done()
    })
    .catch(err =>{
        console.log(err)
    })
})



describe('Test Ecommerce - Product routes', function(){
    describe('User login', function(){
        it('should return success when the value is success', function(done){
            chai.request(app).post('/users/signin').send({
                email : 'testing@mail.com',
                password : 'testing'
            }).end(function(err,res){
                // console.log(res.body, "000000000000000")
                tokenUser = res.body
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe('Customer login', function(){
        it('should return success when the value is success', function(done){
            chai.request(app).post('/users/signin').send({
                email : 'customer@mail.com',
                password : 'customer'
            }).end(function(err,res){
                // console.log(res.body, "000000000000000")
                tokenCustomer = res.body
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe('Success show all product' , function(){
        it(`should return an array of products with status 200`, function(done){
            chai.request(app)
                .get('/products')
                .end(function(err,res){
                // console.log(res)
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe('Success find by productId product', function(){
        it('find product by id should return success message with status 200', function(done){
            chai.request(app)
            .get('/products/'+productId)
            .set('token',tokenUser)
            .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
            })
        })
    })

    describe('Success create product' , function(){
        this.timeout(20000)
        it(`create should return success message with status 201`, function(done){
            chai.request(app)
                
                .post('/products')
                .set('token',tokenUser)
                .attach('images','/Users/Dwitama\ Alfred/hacktiv8/joyfull-fox/phase-2/week3/mini-ecommerce/server/test/img/product1.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'size US 9.5 | BNIB')
                .field('stock', '1')
                .field('price', '6500000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                productId = res.body.product._id
                done()
            })
        })
    })
    

    describe('Success delete product', function(){
        it('delete should return success message with status 200', function(done){
            chai.request(app)
            .delete('/products/'+productId)
            .set('token',tokenUser)
            .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
            })
        })
    })

    describe('Success update product', function(){
        it('update should return success message with status 200', function(done){
            chai.request(app)
                .put('/products/'+productId)
                .set('token',tokenUser)
                .attach('images','/Users/Dwitama\ Alfred/hacktiv8/joyfull-fox/phase-2/week3/mini-ecommerce/server/test/img/product2.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'size US 10 | BNIB')
                .field('stock', '1')
                .field('price', '6000000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe('Error create product' , function(){
        this.timeout(10000)
        it(`create should return error not authorized with status 401`, function(done){
            chai.request(app)
                
                .post('/products')
                .set('token',tokenCustomer)
                .attach('images','/Users/Dwitama\ Alfred/hacktiv8/joyfull-fox/phase-2/week3/mini-ecommerce/server/test/img/product1.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'size US 9.5 | BNIB')
                .field('stock', '1')
                .field('price', '6500000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                done()
            })
        })
    })
    

    describe('Error delete product', function(){
        it('delete should return error not authorized message with status 401', function(done){
            chai.request(app)
            .delete('/products/'+productId)
            .set('token',tokenCustomer)
            .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            done()
            })
        })
    })
    

    describe('Error update product', function(){
        it('update should return error not authorized with status 401', function(done){
            chai.request(app)
                .put('/products/'+productId)
                .set('token',tokenCustomer)
                .attach('images','/Users/Dwitama\ Alfred/hacktiv8/joyfull-fox/phase-2/week3/mini-ecommerce/server/test/img/product2.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'size US 10 | BNIB')
                .field('stock', '1')
                .field('price', '6000000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                done()
            })
        })
    })
})