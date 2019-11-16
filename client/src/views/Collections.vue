<template>
  <div class="about">
    <h1>This is a collection list page</h1>
    <div v-for="(product, index) in productList" :key="index" class="product-card">
    <ProductCard :product="product" />
    </div>
    {{productList}}
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
      this.axios('/products')
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
