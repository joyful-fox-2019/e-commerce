<template>
  <div class="about">
    <div  class="container">
      <div class="columns is-multiline is-mobile">
        <div v-for="(product, index) in productList" :key="index" class="column is-half">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
    <!-- {{productList}} -->
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  data: function () {
    return {
      productList: []
    }
  },
  components: {
    ProductCard
  },
  methods: {
    fetchProduct () {
      this.axios.get('/products')
        .then(({ data }) => {
          console.log(data)
          this.productList = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchProduct()
  }

}
</script>

<style>
.container-product {
  width: 300px;
  height: 300px;
}
</style>
