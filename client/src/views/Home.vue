<template>
  <div class="home">
    <FeaturedProduct v-if="products.length >= 5" :products="products"></FeaturedProduct>
    <div class="mt-10">
    </div>
    <v-row class="text-center ma-2">
      <v-col v-for="(product, i) in products" :key="product._id" md="2" :offset-md="i % 5 === 0? 1 : 0" sm="4" cols="6">
        <Product :product="product"></Product>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import FeaturedProduct from '../components/FeaturedProduct'
import Product from '../components/Product'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    FeaturedProduct,
    Product
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: mapState(['products'])
}
</script>
