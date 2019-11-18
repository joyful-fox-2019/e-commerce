<template>
  <div>
    <!-- {{ cart }} -->
    <div v-for="product in cart" :key="product._id">
      <img :src="product.productId.image" alt="image" style="width: 250px;">
      <h5>Name: {{ product.productId.name }}</h5>
      <h5>Qty: {{ product.qty }}</h5>
      <button class="btn btn-danger" @click="remove(product._id)">Remove</button>
    </div>
    <button class="btn btn-success" @click="buy">Buy Item in Cart</button>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      cart: []
    }
  },
  methods: {
    remove (id) {
      this.$store.dispatch('deleteCart', {
        id
      })
    },
    buy () {
      this.$store.dispatch('buy', {
        productList : this.cart
      })
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
      .then((data) => {
        this.cart = data
      })
  }
}
</script>

<style>

</style>
