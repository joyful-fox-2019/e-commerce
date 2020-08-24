<template>
  <div class="product-list">
      <figure class="image is-square">
      <img @click="redirect(product._id)" :src="product.imageSource" alt="Product image">
      </figure>
      <div class="product-info">
      <h4>{{product.name}}</h4>
      <p>{{itemPrice}}</p>
      </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    redirect (id) {
      this.$router.push(`/collections/${id}`)
    }
  },
  computed: {
    itemPrice () {
      return `IDR ${this.product.price.toLocaleString()}`
    }
  }
}
</script>

<style>
.container-product {
  display: flex;
  flex-direction: row;
  align-items: left;
}
.image {
  object-fit: cover;
}
.product-info {
  text-align: left;
  padding-top: 10px;
  padding-left: 20px;
}

</style>
