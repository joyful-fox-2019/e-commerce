<template>
  <div>
    <div class="container">
      <v-row>
        <v-col lg="8" md="8" cols="12">
          <div class="header f-fancy">
            Shopping Cart
          </div>
          <hr style="margin: 0;" class="mt-3">
          <div v-if="carts.length === 0">
            No products.
          </div>
          <Cart v-for="cart in carts" :key="cart._id" :cart="cart"></Cart>
        </v-col>
        <v-col lg="4" md="4" cols="12" v-if="carts.length > 0">
          <div class="header f-fancy">
            Shopping Summary
          </div>
          <hr style="margin: 0;" class="mt-3">
          <div class="mt-1" style="text-align: center;">
            Total Price:
            <div class="t-secondary" style="font-size: 25px;">
              <b>{{ totalPrice }}</b>
            </div>
            <v-btn @click="buy" class="full-width bg-secondary mt-5">BUY</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Cart from '../components/Cart'
import { mapState } from 'vuex'

export default {
  name: 'Carts',
  components: {
    Cart
  },
  methods: {
    getCarts () {
      this.$store.dispatch('getCarts')
    },
    buy () {
      let payload = {
        carts: this.carts,
        total: this.totalPriceRaw
      }
      this.$store.dispatch('buy', payload)
    }
  },
  created () {
    this.getCarts()
  },
  computed: {
    totalPrice () {
      let result = 0
      this.carts.forEach(cart => {
        result += (cart.product.price * cart.qty)
      })
      return 'IDR ' + result.toLocaleString()
    },
    totalPriceRaw () {
      let result = 0
      this.carts.forEach(cart => {
        result += (cart.product.price * cart.qty)
      })
      return result
    },
    ...mapState(['carts'])
  }
}
</script>

<style>
.header {
  font-size: 20px;
}
</style>
