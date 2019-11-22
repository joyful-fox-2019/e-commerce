<template>
    <div>
        <carousel></carousel>
        <product></product>
    </div>
</template>
<script>

import carousel from '../components/Carousel'
import product from '../components/Product'

export default {
  components: {
    carousel,
    product
  },
  created () {
    if (localStorage.getItem('user') === 'admin') {
      this.$store.commit('CHANGE_USER_LOGIN', 'admin')
    }
    this.$store.dispatch('fetchingProduct')
  }
}
</script>

<style>

</style>
