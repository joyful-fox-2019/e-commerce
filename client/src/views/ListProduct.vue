<template>
  <div class="container" style="min-height:100vh;margin-top: 50px; padding-bottom:100px;">
    <p class="title">All Products</p>
    <div class="container board box">
      <div v-for="(product, i) in products" :key="i" class="row">
        <CardProduct :product="product" class="card"></CardProduct>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from './CardProduct'

export default {
  name: 'ListProduct',
  components: {
    CardProduct
  },
  data () {
    return {}
  },
  computed: {
    products: {
      get () {
        return this.$store.state.dataProduct
      }
    }
  },
  watch: {
    products () {}
  },
  created () {
    this.$store.dispatch('getProduct')
    if (this.$store.state.isAdmin) {
      this.$store.dispatch('getTransactionAdm')
    } else {
      this.$store.dispatch('getTransaction')
    }
  }
}
</script>
<style scoped>
.board {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 2vw 1.7vw;
  padding-bottom: 70px;
  /* justify-content: space-around; */
}
.card {
  margin-top: 100px;
  height: 430px;
  width: 16vw;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.title {
  color: #c44173;
  font-size: 22px;
}
</style>
