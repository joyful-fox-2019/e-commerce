<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="d-flex justify-content-center" style="font-size: 250%">
        Your Cart
      </div>
      <hr>
      <!-- items -->
      <CartCard v-for="item in cart" :key="item._id"
        :item="item"
      />

      <div class="d-flex justify-content-between" style="font-size: 200%">
        <div>
          Subtotal: 
        </div>
        <div>
          Rp. {{ subtotal }}
        </div>
      </div>

      <div>
        <button class="btn" style="background-color: #222222; color: white;" @click.prevent="checkout()">Checkout <img src="../../public/arrow.png" alt="" style="width: 24px"></button>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CartCard from '../components/CartCard.vue'

export default {
  components: {
    Navbar,
    CartCard
  },
  methods: {
    checkout(){
      this.$store.dispatch('checkout')
    }
  },
  computed: {
    cart: {
      get(){
        return this.$store.state.loggedUser.cart
      }
    },
    subtotal(){
      let totalPrice = 0
      this.cart.forEach(item=>{
        totalPrice += item.amount * item.product_id.price
      })
      return totalPrice
    }
  }
}
</script>

<style>

</style>