<template>
  <div class="container-fluid p-0">
    <Jumbotron/>
    <div class="container">
      <div class="d-flex justify-content-center mt-4 mb-4">
        <div class="mr-3 ml-3">
          New Arrivals
        </div>
        <div class="mr-3 ml-3">
          Mens
        </div>
        <div class="mr-3 ml-3">
          Womens
        </div>
      </div>
      <div class="d-flex justify-content-center flex-wrap">
        <Card v-for="product in products" :key="product._id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
import Jumbotron from '../components/Jumbotron.vue'
export default {
  name: 'home',
  components:{
    Card,
    Jumbotron
  },
  computed: {
    products: {
      get(){
        return this.$store.state.products
      },
      set(){

      }
    },
  },
  created(){
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
