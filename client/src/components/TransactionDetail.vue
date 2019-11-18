<template>
  <div class="mt-10">
    <div class="t-secondary">
    <b>{{transaction.customer.email}}</b>
    </div>
    <TransactionCart
    v-for="cart in transaction.carts"
    :key="cart._id" :cart="cart"
    :customer="transaction.customer"
    :status="transaction.status"
    :transaction-id="transaction._id"
    ></TransactionCart>
    <v-btn @click="updateStatus" v-if="$store.state.user._id && $store.state.user.isAdmin && transaction.status === 'Waiting for confirmation'" class="full-width bg-primary">Confirm Delivery</v-btn>
    <v-btn @click="updateStatus" v-if="$store.state.user._id && !$store.state.user.isAdmin && transaction.status === 'Order shipped'" class="full-width bg-secondary">Confirm Received</v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionCart from '../components/TransactionCart'

export default {
  name: 'TransactionDetail',
  methods: {
    getTransaction () {
      this.$store.dispatch('getTransaction', this.$route.params.id)
    },
    updateStatus () {
      this.$store.dispatch('updateStatus', this.transaction._id)
    }
  },
  components: {
    TransactionCart
  },
  created () {
    this.getTransaction()
  },
  computed: mapState(['transaction']),
  watch: {
    '$route.params.id' () {
      this.getTransaction()
    }
  }
}
</script>

<style>

</style>
