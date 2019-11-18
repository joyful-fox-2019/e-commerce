<template>
  <div>
    <banner />
    <productCard :products="products"/>
  </div>

</template>

<script>
import { mapState } from 'vuex'

import banner from '@/components/banner'
import productCard from '@/components/products-card'

export default {
  components: {
    banner,
    productCard
  },
  computed: mapState(['products']),
  created () {
    this.$store.dispatch('GET_PRODUCTS')
  }

}
</script>

<style>

</style>
