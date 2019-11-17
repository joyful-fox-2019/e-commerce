<template>
  <div class="mt-10">
    <TransactionCart
    v-for="cart in transaction.carts"
    :key="cart._id" :cart="cart"
    :customer="transaction.customer"
    :status="transaction.status"
    :transaction-id="transaction._id"
    ></TransactionCart>
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
    }
  },
  components: {
    TransactionCart
  },
  created () {
    this.getTransaction()
  },
  computed: mapState(['transaction'])
}
</script>

<style>

</style>
