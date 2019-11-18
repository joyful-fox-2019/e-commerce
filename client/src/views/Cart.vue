<template>
  <div class="mycart">
    <v-toolbar>
      <v-toolbar-title>My Cart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.stop="checkout">Checkout</v-btn>
    </v-toolbar>
       <v-flex v-for="(cartItem, index) in $store.state.cart" :key="cartItem._id" align-center >
          <CartItem
            :cartitem="cartItem"
            :index="index"/>
        </v-flex>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'

export default {
  name: 'cart',
  components: {
    CartItem
  },
  methods: {
    checkout () {
      let arrayRequest = []
      let total = 0
      let ids = []
      for (let item of this.$store.state.cart) {
        if (item.count > 0) {
          total += item.count * item.product.price
          ids.push(item._id)
          arrayRequest.push(
            instance({
              method: 'PATCH',
              url: `/carts/${item._id}`,
              data: {
                isCheckout: true,
                count: item.count
              }
            })
          )
        }
      }
      Promise.all(arrayRequest)
        .then(results => {
          alert('berhasil udpate')
          let data = {
            total: total,
            carts: ids,
            status: 'topay'
          }
          return instance({
            method: 'POST',
            url: '/transactions',
            data
          })
        })
        .then(result => {
          alert('berhasil transaction')
          this.$store.commit('SHOW_SNACKBAR', { text: 'checkout success' })
          this.$store.commit('ADD_ORDER', result)
          this.$store.dispatch('getCart')
          this.$router.push('/orders/pendingpayment')
        })
        .catch(err => {
          axiosErrorHandler(err)
        })
    }
  }
}
</script>

<style>
.mycart {
  width: 100%
}
</style>
