<template>
  <div>
    <!-- {{ history }} -->
    <div v-for="transaction in history" :key="transaction._id">
      <div v-for="product in transaction.productList" :key="product._id">
        <img :src="product.productId.image[0]" alt="image" style="width: 250px;">
        <h5>Name: {{ product.productId.name }}</h5>
        <h5>Price: Rp. {{ product.productId.price }}</h5>
        <h5>Qty: {{ product.qty }}</h5>
      </div>
      <h5>Total Price: {{ transaction.totalPrice }}</h5>
      <h5>Status: {{ transaction.status }}</h5>
      <button class="btn btn-success" v-if="role === 'customer' && transaction.status === 'onDelivery'" @click="updateStatus(transaction._id, 'Done')">Had arrived</button>
      <button class="btn btn-success" v-if="role === 'admin' && transaction.status === 'onProgress'" @click="updateStatus(transaction._id, 'onDelivery')">Had arrived</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'history',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'role',
      'products',
      'history'
    ])
  },
  methods: {
    updateStatus (id, status) {
      this.$store.dispatch('updateStatus', {
        id,
        status
      })
    }
  },
  mounted () {
    this.$store.dispatch('fetchHistory')
  }
}
</script>

<style>

</style>
