<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <div class="col-lg-3">
          <div class=" container brandBubblebeam">
            <img style="width: 90%;" src="../assets/bubblebeam-logo.png" alt="Logo" />
          </div>
          <b-button variant="info" @click.prevent="viewCart"> <i class="fas fa-shopping-cart"></i> View Cart </b-button>
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
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import Swal from 'sweetalert2'

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
      if (this.$store.isLogin) {
        this.$router.push('/cart')
      } else {
        Swal.fire({
          title: 'You need to login first',
          showConfirmButton: true
        })
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>
<style scoped>
</style>
