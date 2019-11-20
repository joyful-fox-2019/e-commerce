<template>
  <div class="mb-4">
    <div class="p-3" style="width: 100%">
      <div class="container">

          <div class="d-flex mb-3" v-for="product in products" :key="product._id">
            <div style="width: 80px">
              <img :src="product.image" alt="" style="width: 100%; object-fit: cover;">
            </div>
            <div class="ml-3 d-flex flex-column">
              <div>
                Product Id: {{ product._id }}
              </div>
              <div>
                {{ product.name }}
              </div>
              <small>
                Stock: {{ product.stock }}
              </small>
            </div>
            <div class="ml-auto">
              Price: Rp. {{ product.price }}
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products: {
      get(){
        return this.$store.state.products
      }
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.dispatch('fetchProducts')
    }
  }
}
</script>

<style>

</style>