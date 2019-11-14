<template>
  <div>
    <div class="product-window p-10 m-10 w-4/5">
      <router-view></router-view>
    </div>
    <div class="product-list flex flex-wrap justify-around">
      <ProductCard v-for="product in products" :key="product._id" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
      .then(({ data }) => {
        this.$store.commit('SET_PRODUCTS', data)
        console.log(data)
      })
      .catch(({ response }) => {
        this.$notify({ type: 'error', text: response.data.message })
      })
  }
}
</script>

<style>

</style>
