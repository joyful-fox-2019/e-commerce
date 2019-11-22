const chai = require('chai');
const chaiHttp = require('chai-http');
const Product = require('../models/product')
const expect = chai.expect;
const app = require('../app')

chai.use(chaiHttp)


let newProduct = {
    name: 'Sepatu Bola',
    desc: 'ini adalah sepatu Bola Adidas',
    quantity: 500,
    price: 2000000,
    url: 'Image sepatu Adidas'
}

before(function () {
    const data = {
        name: 'Sepatu Sekolah',
        desc: 'ini adalah sepatu sekolah ATT',
        quantity: 200,
        price: 20000,
        url: 'Image sepatu sekolah'
    }
    Product.create(data)
        .then(user => {
            console.log('testing : success to initialize new product')
        })
        .catch(err => {
            console.log(err)
        })
})

after(function () {
    if (process.env.NODE_ENV === 'testing') {
        Product.deleteMany({})
            .then(success => {
                console.log('Drop all product after testing success')
            })
            .catch(err => {
                console.log(err)
            })
    }
})


describe('Product testing', function(){
    describe('#Testing to create product', function(){
        it('should be return object of product data', function(done){
            chai.request(app)
                .post('/product')
                .send(newProduct)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object').to.have.any.keys('productName','description','quantity','price','imageUrl')
                    done()
                })
        })
    })
    describe('#Testing error when create product', function(){
        it('should be return error, empty productName', function(done){
            let errorRequest = {
                name: '',
                desc: 'ini adalah sepatu Bola Adidas',
                quantity: 500,
                price: 1000000,
                url: 'Image sepatu Balet'
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    console.log(res)
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
        it('should be return error, empty description', function(done){
            let errorRequest = {
                name: 'Baju Bola',
                desc: '',
                quantity: 500,
                price: 1000000,
                url: 'Image sepatu Balet'
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    console.log(res)
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
        it('should be return error, empty quantity', function(done){
            let errorRequest = {
                name: 'Baju Bola',
                desc: 'ini adalah baju bola',
                quantity: undefined,
                price: 1000000,
                url: 'Image sepatu Balet'
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    console.log(res)
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
        it('should be return error, input error minus quantity', function(done){
            let errorRequest = {
                name: 'Baju Bola',
                desc: 'ini adalah baju bola',
                quantity: -10,
                price: 1000000,
                url: 'Image sepatu Balet'
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    console.log(res)
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
        it('should be return error, input empty price', function(done){
            let errorRequest = {
                name: 'Baju Bola',
                desc: 'ini adalah baju bola',
                quantity: undefined,
                price: 1000000,
                url: 'Image sepatu Balet'
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    console.log(res)
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
        it('should be return error, input minus price', function(done){
            let errorRequest = {
                name: 'Baju Bola',
                desc: 'ini adalah baju bola',
                quantity: 1000,
                price: -1000000,
                url: 'Image sepatu Balet'
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    console.log(res)
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
        it('should be return error, url image empty', function(done){
            let errorRequest = {
                name: 'Baju Bola',
                desc: 'ini adalah baju bola',
                quantity: 1000,
                price: 1000000,
                url: ''
            }
            chai.request(app)
                .post('/')
                .send(errorRequest)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404);
                    done()
                })
        })
    })
    describe('#Testing GET Product', function(){
        it('should return an array of object of products', function(done){
            chai.request(app)
                .get('/product')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})