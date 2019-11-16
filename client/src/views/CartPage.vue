<template>
  <div class="cart-page">
      <h1>Cart Page</h1>
      <CartItem v-for="item in this.$store.state.cart" :key="item.id" :ItemInCart="item"></CartItem>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  name: 'CartPage',
  props: ['ItemInCart'],
  components: {
    CartItem
  },
  created () {
    this.$store.dispatch('viewCart')
  }
}
</script>

<style>

</style>
