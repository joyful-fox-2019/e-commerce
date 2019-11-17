<template>
  <div id="product-page" class="flex-column items-center">
    <div class="sort flex justify-center m-4 flex">
      <div class="m-1 hover:bg-blue-200 cursor-pointer p-2" :class="sort === 'sold' ? 'bg-green-400 font-bold' : 'bg-blue-400' " @click="changeSort('sold')">Most Sold</div>
      <div class=" m-1 hover:bg-blue-200 cursor-pointer p-2" :class="sort === 'popular'? 'bg-green-400 font-bold' : 'bg-blue-400' " @click="changeSort('popular')">Most Favorites</div>
      <div class=" m-1 hover:bg-blue-200 cursor-pointer p-2" :class="sort === 'cheapest'? 'bg-green-400 font-bold' : 'bg-blue-400'" @click="changeSort('cheapest')">Lowest Price</div>
      <div class=" m-1 hover:bg-blue-200 cursor-pointer p-2" :class="sort === 'expensive'? 'bg-green-400 font-bold' : 'bg-blue-400'" @click="changeSort('expensive')">Highest Price</div>
    </div>
      <div v-if="$route.params.id" class="product-window p-10 mx-auto w-1/2 flex justify-center">
        <router-view></router-view>
      </div>
    <div class="product-list flex flex-wrap justify-around my-20 mx-auto w-4/5">
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
  data () {
    return {
      sort: ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    changeSort (val) {
      this.sort = val
    },
    fetchProducts () {
      this.$store.dispatch('fetchProducts', { sort: this.sort })
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data)
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', text: response.data.message })
        })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts', { })
      .then(({ data }) => {
        this.$store.commit('SET_PRODUCTS', data)
      })
      .catch(({ response }) => {
        this.$notify({ type: 'error', text: response.data.message })
      })
  },
  watch: {
    sort () {
      this.fetchProducts()
    }
  }
}
</script>

<style scoped>
  #product-page {
    background-color: azure;
  }
</style>
