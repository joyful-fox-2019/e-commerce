<template>
  <div class="AdminPage">
    <div class="container">

      <div class="row">

        <div class="col-lg-3">
          <div class=" container brandBubblebeam">
            <img style="width: 90%;" src="../assets/bubblebeam-logo.png" alt="Logo" />
          </div>
          <b-button variant="info" @click.prevent="addProduct"> <i class="far fa-plus-square"></i> Add A Product </b-button>
        </div>

        <div class="col-lg-9">
          <router-view></router-view>
          <AdminCarousel></AdminCarousel>
          <div class="row">
            <AdminProductCard v-for="(product) in this.$store.state.products" :key="product._id" :ProductData="product"></AdminProductCard>
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
import AdminProductCard from '../components/AdminProductCard'
import AdminCarousel from '../components/AdminCarousel'
export default {
  name: 'AdminPage',
  components: {
    AdminProductCard,
    AdminCarousel
  },
  methods: {
    addProduct () {
      this.$router.push('/admin/addProduct')
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }

}
</script>

<style>

</style>
