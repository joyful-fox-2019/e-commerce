<template>
  <div>
    <div class="flex-column items-center border border-blue-700 w-full" >
    <div v-if="$route.params.id" class="product-window p-10 my-10 mx-auto w-1/2 flex justify-center border border-red-800">
      <router-view @change-favorite="changeFavorite"></router-view>
    </div>
    <div class="product-list flex flex-wrap justify-around my-20 mx-auto w-4/5">
      <div v-if="favProducts.length === 0" class="w-full">
        <h1 class="w-full">No Favourite Products yet</h1>
      </div>
      <FavCard v-for="product in favProducts" :key="product._id" :product="product"></FavCard>
    </div>
  </div>
  </div>
</template>

<script>
import FavCard from '../components/FavCard'
import { mapState } from 'vuex'
export default {
  name: 'favorite',
  data () {
    return {
      change: false
    }
  },
  components: {
    FavCard
  },
  computed: {
    ...mapState(['favProducts'])
  },
  methods: {
    changeFavorite () {
      this.change = true
    }
  },
  created () {
    this.$store.dispatch('fetchFav')
  },
  watch: {
    change () {
      this.$store.dispatch('fetchFav')
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 1.2em;
  }
</style>
