<template>
  <div id="cardProduct" class="card" @click="showProduct(productId)">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="image" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <h5>{{ name }}</h5>
        <strong>Rp {{ formatPrice }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: [
    'name',
    'price',
    'image',
    'productId'
  ],
  computed: {
    formatPrice () {
      return (this.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
  methods: {
    showProduct (id) {
      this.$router.push(`/product/${id}`)
    }
  }
}
</script>

<style>
h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card {
  width: 210px;
  height: 280px;
  margin: 10px;
}
.card-content {
  font-size: 14px;
}
</style>
