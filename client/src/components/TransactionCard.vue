<template>
  <div>
    <div class="border p-3 mb-4" style="width: 100%" >
      <div class="d-flex justify-content-between">
        <h4>Product Id: {{ transaction._id }}</h4>
        <div v-if="!transaction.status">
          <button class="btn" style="background-color: #B80F0B; color: white" @click.prevent="delivered(transaction._id)"> Delivered? </button>
        </div>
      </div>
      <div class="container">
        <hr>
        <!-- loop -->
        <div v-for="product in transaction.products" :key="product._id">
          <div class="d-flex">
            <div style="width: 80px">
              <img :src="product.product_id.image" alt="" style="width: 100%; object-fit: cover;">
            </div>
            <div class="ml-3 d-flex flex-column">
              <div>
                {{ product.product_id.name }}
              </div>
              <small>
                Amount: {{ product.amount }}
              </small>
            </div>
            <div class="ml-auto">
              Total: Rp. {{ product.amount * product.product_id.price }}
            </div>
          </div>
          <hr>
        </div>

        <div class="d-flex justify-content-between">
          <div>
            Status: <span style="color: green" v-if="transaction.status">Delivered</span> <span style="color: red" v-else>On process</span>
          </div>
          <div>
            Rp. {{ totalPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transaction'],
  computed: {
    totalPrice(){
      let total = 0
      this.transaction.products.forEach(product=>{
        total += product.amount * product.product_id.price
      })
      return total
    }
  },
  methods: {
    delivered(id){
      this.$store.dispatch('transactionDone', id)
    }
  }
}
</script>

<style>

</style>