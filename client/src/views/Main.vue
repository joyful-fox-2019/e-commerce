<template>
  <div>
    <div>
      <div v-if="!$route.params.id" id="banner" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading">E-COM example</h1>
          <p class="lead">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <div class="d-flex justify-content-between">
            <a class="btn btn-primary my-2">Main call to action</a>
            <a class="btn btn-secondary my-2">Secondary action</a>
          </div>
        </div>
      </div>

      <!-- SINI ROUTER KUY -->
      <router-view
      :detailProduct="detailProduct"
      @fetchCart="fetchCart"
      />

      <div class="album py-5 bg-light">
            <nav class="d-flex justify-content-center" aria-label="Page navigation example">
              <ul class="pagination">
                <li v-if="page>1" @click="fetchBack(); changePage-=1" class="page-item"><a class="page-link" style="cursor:pointer">Previous</a></li>
                <li  v-for="(num, index) in maxPage" :key="index"
                @click="fetchPagination(index+1); changePage=index"
                :class="{'page-item':true, active:changePage == index}">
                <a class="page-link" style="cursor:pointer">{{index + 1}}</a></li>
                <li v-if="page !== maxPage" @click="fetchNext(); changePage+=1" class="page-item"><a class="page-link" style="cursor:pointer">Next</a></li>
              </ul>
            </nav>

        <!--List Products -->
        <div class="container">
          <div class="row">
            <Products
            style="cursor:pointer"
            v-for="product in listProductsNow" :key="product._id"
            :productData="product"
            :role="role"
            @detailPayload="detailPayload"
            :user="user"
            />
          </div>
        </div>

            <nav class="d-flex justify-content-center" aria-label="Page navigation example">
              <ul class="pagination">
                <li v-if="page>1" @click="fetchBack(); changePage-=1" class="page-item"><a class="page-link" style="cursor:pointer">Previous</a></li>
                <li  v-for="(num, index) in maxPage" :key="index"
                @click="fetchPagination(index+1); changePage=index"
                :class="{'page-item':true, active:changePage == index}">
                <a class="page-link" style="cursor:pointer">{{index + 1}}</a></li>
                <li v-if="page !== maxPage" @click="fetchNext(); changePage+=1" class="page-item"><a class="page-link" style="cursor:pointer">Next</a></li>
              </ul>
            </nav>
      </div>

    </div>
  </div>
</template>

<script>

import Products from '@/components/Products'
import axios from '../../myaxios/axios'
export default {
  props: ['role', 'routes', 'user'],
  name: 'Main',
  data () {
    return {
      listProducts: '',
      listProductsNow: '',
      page: 1,
      maxPage: 1,
      changePage: 0,
      detailProduct: ''
    }
  },
  components: {
    Products
  },
  methods: {
    fetchAllProducts () {
      axios.get('/products')
        .then(({ data }) => {
          this.listProducts = data
          console.log(this.listProducts)
          this.maxPage += Math.floor(((data.length) / 9) - 0.1)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    fetchPagination (page) {
      this.listProductsNow = ''
      this.page = page
      this.inactive = false
      this.activate = true
      axios.get(`/products/page/${page}`)
        .then(({ data }) => {
          this.listProductsNow = data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    fetchNext () {
      this.listProductsNow = ''
      this.page += 1
      axios.get(`/products/page/${this.page}`)
        .then(({ data }) => {
          this.listProductsNow = data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    fetchBack () {
      this.listProductsNow = ''
      this.page -= 1
      axios.get(`/products/page/${this.page}`)
        .then(({ data }) => {
          this.listProductsNow = data
        })
    },
    detailPayload (payload) {
      this.detailProduct = payload
    },
    fetchCart(){
      this.$emit('fetchCart')
    }
  },
  created () {
    this.fetchAllProducts()
    this.fetchPagination(this.page)
    this.$router.push('/')
  }
}
</script>

<style>
  #banner{
      background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(https://www.techprevue.com/wp-content/uploads/2018/03/design-effective-e-commerce-website.png);
      background-size:cover;
      background-position: center;
  }
</style>
