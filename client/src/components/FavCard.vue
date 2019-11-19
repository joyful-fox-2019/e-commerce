<template>
  <div class="product-card shadow-lg flex-column w-1/5 m-4">
    <div class="product-img w-full" style="height: 65%;">
      <img :src="product.image" alt="img" >
    </div>
    <div class="product-info w-full flex-column">
      <div><h3>{{product.name}}</h3></div>
      <div>USD {{product.price}}</div>
    </div>
    <div class="product-action">
      <button class="p-2 m-2 bg-gray-800 hover:bg-gray-600 text-white" @click="showDetail(product._id)">Show Detail</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    showDetail (id) {
      this.$router.push(`/myaccount/favorites/${id}`)
    }
  }
}
</script>

<style scoped>
  .product-img img {
    object-fit: contain;
  }
  h3 {
    font-size: 14px;
  }
</style>
