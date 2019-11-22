const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const fs = require('fs')
const User = require('../models/user')
const Product = require('../models/product')

chai.use(chaiHttp)
const expect = chai.expect

let adminToken = ''
let customerToken = ''

let admin = {
    username: 'admin',
    email: "admin@mail.com",
    password: '123',
    role: 'admin'
}

let customer = {
    username: 'customer',
    email: "customer@mail.com",
    password: '123',
    role: 'customer'
}
let productData = {
    name: "pokemon shield",
    price: "650000",
    stock: "11"
}

let updateProductData = {
    name: "pokemon saphhire",
    price: "1000000",
    stock: "1"
}

let gonnaBeDeletedProductId = ''

before('register user as admin', function(done) {
    chai.request(app)
    .post('/users/register')
    .send(admin)
    .end(function(err, res) {
        if(err) {
            done(err)
        } else {
            adminToken = res.body.token
            // console.log(res.body);
            done()
        }
    })
})

before('register user as customer', function(done) {
    chai.request(app)
    .post('/users/register')
    .send(customer)
    .end(function(err, res) {
        if(err) {
            done(err)
        } else {
            customerToken = res.body.token
            // console.log(res.body);
            done()
        }
    })
})

before('create gonna be deleted product', function(done) {
    this.timeout(10000)
    Product.create({
        name: 'dummy product',
        price: 9000,
        stock: '12',
        image: 'asdasdasd'
    })
        .then(data => {
            gonnaBeDeletedProductId = data._id
            console.log(data, "<<<<< DISINI")
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})

// after(function(done) {
//     if(process.env.NODE_ENV === 'testing') {
//         Product.deleteMany({})
//             .then(() => {
//                 console.log(`testing: success delete product data`)
//                 done()
//             })
//             .catch(console.log)
//     }
// })

describe('CRUD Products Endpoints', function() {
    this.timeout(10000)
    describe('Create a product', function() {
        describe('success process', function() {
            it('should return an object (data) with status code 201', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'price', 'stock', 'image')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object (data) with status code 401', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', customerToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object (data) with status code 401 when token is missing', function(done) {
                chai.request(app)
                .post('/products')
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
            it('should return an object (data) with status code 400 when name field is missing', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should return an object (data) with status code 400 when price field is missing', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .field('name', productData.name)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should return an object (data) with status code 400 when stock field is missing', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should return an object (data) with status code 400 when image field is missing', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Please Upload new Image')
                    done()
                })
            })
            it('should return an object (data) with status code 401 when using wrong token and missing name field', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', customerToken)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object (data) with status code 401 when using wrong token and missing price field', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', customerToken)
                .field('name', productData.name)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object (data) with status code 401 when using wrong token and missing stock field', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', customerToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object (data) with status code 401 when using wrong token and missing name field', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', customerToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
        })
    })
    describe('GET /products/', function() {
        describe('success process', function() {
            it('should return an array of objects with status code 200', function(done) {
                chai.request(app)
                .get('/products')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
    })
    describe('GET /products/:id', function() {
        describe('success process', function() {
            it('should return a correct data with status 200', function(done) {
                chai.request(app)
                .get('/products/' + '5dd198aa8e6a1d0e1964018c')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'price', 'stock', 'image')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object with message product not found and status 404', function(done) {
                chai.request(app)
                .get('/products/' + '5dd1982bdae8cd0d98719979')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('product not found')
                    done()
                })
            })
            it('should return an object with message jwt must be provided (missing token) and status 401', function(done) {
                chai.request(app)
                .get('/products/' + '5dd1982bdae8cd0d98719979')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
    })
    describe('DELETE /products/:id', function() {
        describe('success process', function() {
            it('should return status 200', function(done) {
                chai.request(app)
                .delete('/products/' + gonnaBeDeletedProductId)
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object with message product not found and status 404', function(done) {
                chai.request(app)
                .delete('/products/' + '5dca8a4f54c8781f52b664ee')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('product not found')
                    done()
                })
            })
            it('should return an object with message jwt must be provided (missing token) and status 401', function(done) {
                chai.request(app)
                .delete('/products/' + '5dd1982bdae8cd0d9871997f')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
    })
    describe('UPDATE /products/:id', function() {
        describe('success process', function() {
            it('should return an object (data) with status 200', function(done) {
                chai.request(app)
                .put('/products/' + "5dd1993b1d5a090e522de13d")
                .set('token', adminToken)
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'price', 'stock', 'image')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object with message you are not authorized and status 401', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .set('token', customerToken)
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object with message jwt must be provided (missing token) and status 401', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
            it('should return an object (data) with status 400 when name field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dd1993b1d5a090e522de13d")
                .set('token', adminToken)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should return an object (data) with status 400 when price field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dd1993b1d5a090e522de13d")
                .set('token', adminToken)
                .field('name', updateProductData.name)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should return an object (data) with status 400 when stock field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dd1993b1d5a090e522de13d")
                .set('token', adminToken)
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should return an object (data) with status 400 when image field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dd1993b1d5a090e522de13d")
                .set('token', adminToken)
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Please Upload new Image')
                    done()
                })
            })
            it('should return an object with message you are not authorized and status 401 when using wrong token and name field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .set('token', customerToken)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object with message you are not authorized and status 401 when using wrong token and price field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .set('token', customerToken)
                .field('name', updateProductData.name)
                .field('stock', updateProductData.stock)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object with message you are not authorized and status 401 when using wrong token and stock field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .set('token', customerToken)
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .attach('image', fs.readFileSync('./test/images/pokealphasapphire.jpeg'), 'pokealphasapphire.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object with message you are not authorized and status 401 when using wrong token and image field is missing', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .set('token', customerToken)
                .field('name', updateProductData.name)
                .field('price', updateProductData.price)
                .field('stock', updateProductData.stock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
        })
    })
})