const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect
let userId = null
let newProduct ={
    userId,
    name: 'Product 1',
    file: 'imageUrl',
    image: 'imageUrl',
    desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
    price: 500,
    stock: 10
}
let token1 = null
let token2 = null
let productId = null
let deletedProductId = '5dca64c66456512b4f6cbd7f'

before(function(done) {
    User.create({
      email: 'satu@satu.com',
      password: 'satu',
      address: 'Tokyo'
    })
    .then(user => {
        token1 = generateToken({
            id: user._id
        })
        console.log('success generate token1')
        newProduct.userId = user._id
        return Product.create(newProduct)
    })
    .then(product =>{
        productId = product._id
        return User.create({
            email: 'dua@dua.com',
            password: 'dua',
            address: 'Tokyo'
        })
    })
    .then(user => {
        token2 = generateToken({
            id: user._id
        })
        console.log('success generate token2')
        done()
    })
    .catch(console.log)
})

// delete data after testing
after(function(done){
    if(process.env.NODE_ENV == 'testing'){
        Product.deleteMany({})
        .then(()=>{
            console.log('testing: delete data product success!')
            return User.deleteMany({})
        })
        .then(()=>{
            console.log('testing: delete data user success!')
            done()
        })
        .catch(console.log)
    }
})

describe('Product Router', function(){
    this.timeout(10000); 
    describe('POST /products', function(){
        describe('Success Create Product', function(){

            it('should return an object ( product ) with status code 201', function(done){
                chai.request(app)
                .post('/products/test')
                .send(newProduct)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.keys('_id', 'userId', 'name', 'desc','image' ,'price' ,'stock', 'createdAt', 'updatedAt', '__v')
                    done()
                })
            })

            
        })

        describe('Error Create Product', function(){

            it('should send an error with status code 400 because empty name', function(done){
                const withoutName = { ...newProduct }
                delete withoutName.name
                chai.request(app)
                .post('/products/test')
                .send(withoutName)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('Product name is required')
                    done()
                })
            })

            it('should send an error with status code 400 because empty image', function(done){
                const withoutImage = { ...newProduct }
                delete withoutImage.file
                chai.request(app)
                .post('/products/test')
                .send(withoutImage)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('Product image is required')
                    done()
                })
            })


            it('should send an error with status code 400 because empty description', function(done){
                const withoutDesc = { ...newProduct }
                delete withoutDesc.desc
                chai.request(app)
                .post('/products/test')
                .send(withoutDesc)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('Product description is required')
                    done()
                })
            })


            it('should send an error with status code 400 because empty price', function(done){
                const withoutPrice = { ...newProduct }
                delete withoutPrice.price
                chai.request(app)
                .post('/products/test')
                .send(withoutPrice)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('Product price is required')
                    done()
                })
            })

            it('should send an error with status code 400 because price bellow zero', function(done){
                const priceBellowZero = { ...newProduct, price: -1 }
                chai.request(app)
                .post('/products/test')
                .send(priceBellowZero)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('minimal product price is 0')
                    done()
                })
            })

            it('should send an error with status code 400 because empty stock', function(done){
                const withoutStock = { ...newProduct }
                delete withoutStock.stock
                chai.request(app)
                .post('/products/test')
                .send(withoutStock)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('Product stock is required')
                    done()
                })
            })

            it('should send an error with status code 400 because stock bellow zero', function(done){
                const stockBellowZero = { ...newProduct, stock: -1 }
                chai.request(app)
                .post('/products/test')
                .send(stockBellowZero)
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('minimal product stock is 0')
                    done()
                })
            })

            it('should send an error with status code 400 because user not loged in', function(done){
                chai.request(app)
                .post('/products/test')
                .send(newProduct)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })
            
        })

    })

    describe('GET /products', function(){
        describe(' Success Show All Products', function(done){
            it('should return an array ( products ) with status code 200', function(done){
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
        describe(' Success Show One Product', function(){
            it('should return an object ( product ) with status code 200', function(done){
                chai.request(app)
                .get(`/products/${productId}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'desc','price' ,'stock')
                    done()
                })
            })
        })

        describe('Error to Show One Product', function(){
            it('should send an error with status code 404 because product id is invalid', function(done){
                const wrongProductId = productId + 'a'
                chai.request(app)
                .get(`/products/${wrongProductId}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.be.an('string').that.includes(`Cast to ObjectId failed for value "${wrongProductId}" at path "_id" for model "Product"`)
                    done()
                })
            })

            it('should send an error with status code 404 because product is not found', function(done){
                chai.request(app)
                .get(`/products/${deletedProductId}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body.message).to.be.an('string').that.includes('Product not found')
                    done()
                })
            })
        })
    })

    describe('PATCH /products/:id', function(){
        describe('Success Update Product', function(){

            it('should return an object ( product ) with status code 200', function(done){
                chai.request(app)
                .patch(`/products/${productId}/test`)
                .send({ name: 'update' })
                .set('token', token1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'desc','price' ,'stock', '_id')
                    done()
                })
            })

        })

        describe('Error Update Product', function(){
            it('should send an error with status code 403 because unauthorized user try to update product', function(done){
                chai.request(app)
                .patch(`/products/${productId}/test`)
                .send({ name: 'update' })
                .set('token', token2)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('Unauthorized')
                    done()
                })
            })

            it('should send an error with status code 400 because user not loged in', function(done){
                chai.request(app)
                .patch(`/products/${productId}/test`)
                .send({ name: 'update' })
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })

            it('should send an error with status code 404 because product is not found', function(done){
                chai.request(app)
                .get(`/products/${deletedProductId}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body.message).to.be.an('string').that.includes('Product not found')
                    done()
                })
            })

            it('should send an error with status code 404 because product is invalid', function(done){
                const wrongProductId = productId + 'a'
                chai.request(app)
                .get(`/products/${wrongProductId}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.be.an('string').that.includes(`Cast to ObjectId failed for value "${wrongProductId}" at path "_id" for model "Product"`)
                    done()
                })
            })

        })
        
    })

})