<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <table class="table table-hover mt-5 ml-5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th class="text-center">Price</th>
              <th class="text-center">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in carts" :key="cart.id">
              <td class="col-sm-8 col-md-6">
                <div class="media">
                  <div class="thumbnail pull-left">
                    <img
                      class="media-object"
                      :src="cart.product.image"
                      style="width: 72px; height: 72px;"
                    />
                  </div>
                  <div class="media-body ml-2">
                    <h4 class="media-heading">
                      <span>{{cart.product.name}}</span>
                    </h4>
                    <span>Stock:</span>
                    <span class="text-success">
                      <strong>&nbsp; {{cart.product.stock}}</strong>
                    </span>
                  </div>
                </div>
              </td>
              <td class="col-sm-1 col-md-1" style="text-align: center">
                <input
                  type="number"
                  min="1"
                  :max="cart.product.stock"
                  class="form-control"
                  @change="updateCart(cart._id, cart.product._id)"
                  id="quantity"
                  :value="cart.quantity"
                />
              </td>
              <td class="col-sm-1 col-md-1 text-center">
                <strong>{{rupiah(cart.product.price)}}</strong>
              </td>
              <td class="col-sm-1 col-md-1 text-center">
                <strong>{{rupiah(subtotal(cart.quantity, cart.product.price))}}</strong>
              </td>
              <td class="col-sm-1 col-md-1">
                <button type="button" class="btn btn-danger" @click="removeCart(cart._id)">
                  <span class="glyphicon glyphicon-remove"></span> Remove
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <h3>Total</h3>
              </td>
              <td class="text-right">
                <h3>
                  <strong>{{total}}</strong>
                </h3>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button type="button" class="btn btn-warning" @click="backToHome">
                  <span class="glyphicon glyphicon-shopping-cart"></span> Shopping
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-success" @click="checkOut">
                  Checkout
                  <span class="glyphicon glyphicon-play"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    subtotal (quantity, price) {
      return quantity * price
    },
    rupiah (price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(price)
    },
    updateCart (cartId, productId) {
      let payload = {
        cartId,
        productId,
        quantity: event.target.value
      }
      this.$store.dispatch('updateCart', payload)
    },
    removeCart (cartId) {
      let payload = {
        cartId
      }
      this.$store.dispatch('removeCart', payload)
    },
    backToHome () {
      this.$router.push('/')
    },
    checkOut () {
      this.$store.dispatch('checkOut').then(response => {
        this.$store.dispatch('getProducts')
        this.$router.push('/')
      })
    }
  },
  computed: {
    ...mapState({
      carts: 'carts'
    }),
    total () {
      let totalPrice = 0
      for (let i = 0; i < this.carts.length; i++) {
        totalPrice += this.carts[i].quantity * this.carts[i].product.price
      }
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(totalPrice)
    }
  },
  created () {
    this.$store.dispatch('getCarts')
  }
}
</script>

<style>
</style>
