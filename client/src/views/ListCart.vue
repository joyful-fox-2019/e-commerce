<template>
    <div>
        <cart></cart>
    </div>
</template>

<script>

import cart from '../components/Cart'

export default {
  components: {
    cart
  },
  created () {
    this.$store.dispatch('fetchingCart')
  }
}
</script>

<style>

</style>
