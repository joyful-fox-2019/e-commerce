<template>
  <div>
    {{ history }}
    <!-- <div v-for="product in history" :key="product._id">
      <img :src="product.productId.image" alt="image" style="width: 250px;">
      <h5>Name: {{ product.productId.name }}</h5>
      <h5>Qty: {{ product.qty }}</h5>
      <button class="btn btn-danger" @click="remove(product._id)">Remove</button>
    </div>
    <button class="btn btn-success" @click="buy">Buy Item in Cart</button> -->
  </div>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      history: []
    }
  },
  methods: {
    
  },
  created () {
    this.$store.dispatch('fetchHistory')
      .then((data) => {
        this.history = data
      })
  }
}
</script>

<style>

</style>
