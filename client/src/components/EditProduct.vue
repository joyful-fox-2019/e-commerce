<template>
  <div>
    <div class="card mb-3">
        <img :src="oneProduct.imageUrl" class="card-img-top" alt="gambar">
    <div class="card-body">
    <h5 class="card-title">{{ oneProduct.productName }}</h5>
    <p class="card-text"> {{ oneProduct.description }} </p>
    <p class="card-text"> {{ oneProduct.quantity }} </p>
    <p class="card-text"> {{ oneProduct.price }} </p>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    oneProduct () {
      return this.$store.state.currentProduct
    }
  }
}
</script>

<style>

</style>
