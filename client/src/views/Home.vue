<template>
  <div class="home">
    <v-container fluid grid-list-xl>
      <v-layout wrap justify-start>
        <v-flex v-for="product in $store.state.products" :key="product._id">
          <ProductItem
            :product="product"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem'

export default {
  name: 'home',
  components: {
    ProductItem
  }
}
</script>
