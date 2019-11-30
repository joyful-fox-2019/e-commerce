const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const { generateToken } = require('../helpers/jwt')
const fs = require('fs')

chai.use(chaiHttp)
const expect = chai.expect

let initialProduct = {}
let initialToken = ''
let initialProductIdForDeleted = ''

let newProduct = {
  name: "Something2",
  price: 300000,
  qty: 12,
  imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
}

let editProduct = {
  name: "Something4",
  price: 2000004,
  qty: 102,
  imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
}

before(async () => {
  try{
    let user = await User.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      role: 'admin'
    })
    initialToken = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
    let productData = await Product.create({
      name: "Something",
      price: 200000,
      qty: 10,
      imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
    })
    let productDataForDelete = await Product.create({
      name: "Something",
      price: 200000,
      qty: 10,
      imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
    })
    initialProduct = productData
    initialProductForDeleted = productDataForDelete
  }
  catch(err){
    console.log(err)
  }
}) 

after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany({})
      .then(_ => {
        console.log('testing: delete data product success!')
        return User.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Product Route', () => {

  describe('POST /product', () => {
    describe('Success add data', () => {
      it('Should return (name,price,qty,imgUrl) without with 201 status code', (done) => {
        let newProduct = {
          name: "Something",
          price: 200000,
          qty: 10}
        chai.request(app)
        .post('/products')
        .field('qty', newProduct.qty)
        .field('price', newProduct.price)
        .field('name', newProduct.name)
        .attach('imgUrl', fs.readFileSync("./test/img/gambar.jpg"), "gambar.jpg")
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('name','price','qty','imgUrl','_id')
          initialProductIdForDeleted = res.body._id
          console.log(initialProductIdForDeleted)
          expect(res.body.name).to.be.an('string')
          expect(res.body.imgUrl).to.be.an('string')
          expect(res.body.price).to.be.an('number')
          expect(res.body.qty).to.be.an('number')
          done()
        })
      })
    })
    describe('Fail add data', () => {
      it('should return error with status code 401 if no access_token provide', (done) => {
        chai.request(app)
        .post('/products')
        .send(newProduct)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Invalid authentication')
          done()
        })
      })
      it('should return error with status code 400 if no product name', (done) => {
        const withoutName = { ...newProduct }
        delete withoutName.name
        chai.request(app)
        .post('/products')
        .set('access_token',initialToken)
        .send(withoutName)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','erorrs')
          expect(res.body.message).to.be.an('string').to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Name required')
          done()
        })
      })
      it('should return error with status code 400 if no product price', (done) => {
        const withoutPrice = { ...newProduct }
        delete withoutPrice.price
        chai.request(app)
        .post('/products')
        .set('access_token',initialToken)
        .send(withoutPrice)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','erorrs')
          expect(res.body.message).to.be.an('string').to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Price required')
          done()
        })
      })
      it('should return error with status code 400 if no product imgUrl', (done) => {
        const withoutImgUrl = { ...newProduct }
        delete withoutImgUrl.imgUrl
        chai.request(app)
        .post('/products')
        .set('access_token',initialToken)
        .send(withoutImgUrl)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','erorrs')
          expect(res.body.message).to.be.an('string').to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('imgUrl required')
          done()
        })
      })
      it('should return error with status code 400 if no product qty', (done) => {
        const withoutQty = { ...newProduct }
        delete withoutQty.qty
        chai.request(app)
        .post('/products')
        .set('access_token',initialToken)
        .send(withoutQty)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message','erorrs')
          expect(res.body.message).to.be.an('string').to.equal('validation error')
          expect(res.body.errors).to.be.an('array').that.includes('Qty required')
          done()
        })
      })
    })
  })

  describe('GET /products', () => {
    describe('Success get data', () => {
      it('Should success return data with 200 status code', (done) => {
        chai.request(app)
        .get('/products')
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
      it('Should success return one data with 200 status code', (done) => {
        chai.request(app)
        .get(`/products/detail/${initialProduct._id}`)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('name','price','qty','imgUrl')
          expect(res.body.name).to.be.an('string')
          expect(res.body.imgUrl).to.be.an('string')
          expect(res.body.price).to.be.an('number')
          expect(res.body.qty).to.be.an('number')
          done()
        })
      })
    })
    describe('Fail get data', () => {
      it('Should error to get data with 404 status code', (done) => {
        chai.request(app)
        .get(`/products/detail/5dcb636d7d9c6622bf840812`)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equals('Data not found')
          done()
        })
      })
    })
  })

  describe('PATCH /products/:_id', () => {
    describe('Success update data', () => {
      it('Should return response with 200 status code', (done) => {
        chai.request(app)
        .patch(`/products/${initialProduct._id}`)
        .send(editProduct)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('n','nModified','ok')
          expect(res.body.n).to.be.an('number').to.equal(1)
          expect(res.body.nModified).to.be.an('number').to.equal(1)
          expect(res.body.ok).to.be.an('number').to.equal(1)
          done()
        })
      })
    })
    describe('Fail update data', () => {
      it('should return error with status code 401 if no access_token provide', (done) => {
        chai.request(app)
        .patch(`/products/${initialProduct._id}`)
        .send(newProduct)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Invalid authentication')
          done()
        })
      })
      it('should return error with status code 400 if update with no product name', (done) => {
        const withoutName = { ...editProduct }
        delete withoutName.name
        chai.request(app)
        .patch(`/products/${initialProduct._id}`)
        .set('access_token',initialToken)
        .send(withoutName)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Must update with valid data!')
          done()
        })
      })
      it('should return error with status code 400 if update with no product price', (done) => {
        const without = { ...editProduct }
        delete without.price
        chai.request(app)
        .patch(`/products/${initialProduct._id}`)
        .set('access_token',initialToken)
        .send(without)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Must update with valid data!')
          done()
        })
      })
      it('should return error with status code 400 if update with no product imgUrl', (done) => {
        const without = { ...editProduct }
        delete without.imgUrl
        chai.request(app)
        .patch(`/products/${initialProduct._id}`)
        .set('access_token',initialToken)
        .send(without)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Must update with valid data!')
          done()
        })
      })
      it('should return error with status code 400 if update with no product qty', (done) => {
        const without = { ...editProduct }
        delete without.qty
        chai.request(app)
        .patch(`/products/${initialProduct._id}`)
        .set('access_token',initialToken)
        .send(without)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Must update with valid data!')
          done()
        })
      })
      it('should return error with status code 400 if update with invalid product id', (done) => {
        const without = { ...editProduct }
        chai.request(app)
        .patch(`/products/5dcc7f08f81b0f306dc3533a`)
        .set('access_token',initialToken)
        .send(without)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Data not found')
          done()
        })
      })
    })
  })

  describe('DELETE /products/:id', () => {
    describe('Success delete product', () => {
      it('Should return response with 200 status code', (done) => {
        chai.request(app)
        .delete(`/products/${initialProductIdForDeleted}`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys( 'deleteProductData','deleteImgDataInGCS' )
          done()
        })
      })
    })
    describe('Fail delete product', () => {
      it('should return error with 401 status code if no access_token provide', (done) => {
        chai.request(app)
        .delete(`/products/${initialProduct._id}`)
        .send(newProduct)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Invalid authentication')
          done()
        })
      })
      it('should return error with 404 status code if data not found', (done) => {
        chai.request(app)
        .delete(`/products/5dcc7f08f81b0f306dc3533a`)
        .send(newProduct)
        .set('access_token', initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Data not found')
          done()
        })
      })
    })
  })

})