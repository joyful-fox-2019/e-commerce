<template>
  <div>
    <!-- {{ cart }} -->
    <div v-if="cart.length>0" class="container cart">
      <div v-for="product in cart" :key="product._id">
        <img :src="product.productId.image" alt="image" style="width: 250px;">
        <h5>Name: {{ product.productId.name }}</h5>
        <h5>Qty: {{ product.qty }}</h5>
        <button class="btn btn-danger" @click="remove(product._id)">Remove</button>
      </div>
      <button class="btn btn-success" @click="buy">Buy Item in Cart</button>
    </div>
    <div v-if="cart.length<=0" class="empty">
      <div>
        <h1>Cart is Empty</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'cart',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'role',
      'products',
      'cart',
      'history'
    ])
  },
  methods: {
    remove (id) {
      this.$store.dispatch('deleteCart', {
        id
      })
    },
    buy () {
      this.$store.dispatch('buy', {
        productList: this.cart
      })
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>
.empty{
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100vh;
}
</style>
