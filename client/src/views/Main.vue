<template>
  <div>
    <div>
      <div v-if="!$route.params.id" id="banner" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading">Welcome to E-COM</h1>
          <p class="lead">Enjoy and see what products you need in here</p>
          <div class="d-flex justify-content-between">
            <!-- write some if necessary -->
          </div>
        </div>
      </div>

      <!-- SINI ROUTER KUY -->
      <router-view
      :detailProduct="detailProduct"
      @fetchCart="fetchCart"
      :role="role"
      />
      <div v-if="listProductsNow.length>0" class="album py-5 bg-light">

        <div class="px-3">
          <form @submit.prevent="searchProducts" id="searchProducts">
            <div class="form-group">
              <div class="input-group">
                  <input v-model="search" type="text" class="form-control form-control-lg" id="searchBox" aria-describedby="searchBox" placeholder="Search Products">
                  <span class="input-group-text"><img src="https://image.flaticon.com/icons/svg/149/149852.svg" alt="searchIcon" height="20" width="30"></span>
              </div>
            </div>
          </form>
        </div>

        <nav v-if="notSearch" class="d-flex justify-content-center" aria-label="Page navigation example">
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

            <nav v-if="notSearch"  class="d-flex justify-content-center" aria-label="Page navigation example">
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

      <div v-else class="" style="background-color:grey; height:35vh">
        <div class="px-3 pt-5">
          <form @submit.prevent="searchProducts" id="searchProducts">
            <div class="form-group">
              <div class="input-group">
                  <input v-model="search" type="text" class="form-control form-control-lg" id="searchBox" aria-describedby="searchBox" placeholder="Search Products">
                  <span class="input-group-text"><img src="https://image.flaticon.com/icons/svg/149/149852.svg" alt="searchIcon" height="20" width="30"></span>
              </div>
            </div>
          </form>
        </div>
          <h1 class="text-center text-white font-weight-bold">No Products Found</h1>
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
      detailProduct: '',
      search : '',
      notSearch : true
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
    fetchCart () {
      this.$emit('fetchCart')
    },
    searchProducts(){
      if(this.search === ''){
        this.page = 1
        this.fetchPagination(this.page)
        this.notSearch = true
      }else{
        axios.get(`/products/search?filter=${this.search}`,{
          headers :{
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          this.notSearch = false
          this.listProductsNow= data
        })
        .catch(err=>{
          console.log(err.response.data.message)
        })
      }
    },
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
