<template>
  <div>
    <carousel></carousel>
    <custproduct></custproduct>
  </div>
</template>

<script>

import carousel from '../components/Carousel'
import custproduct from '../components/CustomerProduct'

export default {
  components: {
    carousel,
    custproduct
  },
  created () {
    this.$store.dispatch('fetchingProduct')
  }
}
</script>

<style>

</style>
