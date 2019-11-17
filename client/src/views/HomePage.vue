<template>
  <div class="product">
    <ProductsAd :products="products"></ProductsAd>
  </div>
</template>
<script>
import ProductsAd from '../components/ProductsAd'
export default {
  name: 'HomePage',
  components: {
    ProductsAd
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  mounted () {
    this.$store.dispatch('getProducts')
    if (localStorage.getItem('access_token')) {
      this.$store.commit('IS_LOGIN')
      if (localStorage.getItem('privilege') === 'ADMIN') {
        this.$store.commit('IS_ADMIN')
      }
    }
  }
}
</script>

<style scoped>
</style>
