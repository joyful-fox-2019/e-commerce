<template>
  <div>
      <h1 class="my-3">WELCOME TO WISHLIST</h1>
    <productCard :products="wishlist"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import productCard from '@/components/products-card'

export default {
  components: {
    productCard
  },
  computed: {
    ...mapState(['wishlist'])
  },
  created () {
    this.$store.dispatch('GET_WISHLIST')
  }

}
</script>

<style>

</style>
