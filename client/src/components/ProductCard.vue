<template>
  <div class="product-card shadow-lg flex-column w-1/4 m-4">
    <div class="product-img w-full">
      <img :src="product.image" alt="img">
    </div>
    <div class="product-info w-full flex-column">
      <div>{{product.name}}</div>
      <div>{{product.price}}</div>
    </div>
    <div class="product-action">
      <button class="p-2 m-2 bg-gray-800 text-white" @click="showDetail(product._id)">Show Detail</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    showDetail (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style>
  .product-img img {
    object-fit: contain;
  }
</style>
