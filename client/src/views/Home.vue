<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <div class="col-lg-3">
          <h1 class="my-4">Bubblebeam</h1>
          <b-button variant="info" @click="viewCart"> <i class="fas fa-shopping-cart"></i> View Cart </b-button>
        </div>

        <div class="col-lg-9">
          <Carousel></Carousel>
          <div class="row">
            <ProductCard v-for="(product) in this.$store.state.products" :key="product._id" :ProductData="product"></ProductCard>
          </div>
        </div>

      </div>
      <!-- end of main row div -->
    </div>
    <!-- end of container div -->
     <!-- Footer -->
    <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Bubblebeam 2019 </p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
// import axios from 'axios'

export default {
  name: 'home',
  components: {
    Carousel,
    ProductCard
  },
  props: ['ProductData'],
  data () {
    return {
      products: []
    }
  },
  methods: {
    viewCart () {
      this.$router.push('/cart')
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>
