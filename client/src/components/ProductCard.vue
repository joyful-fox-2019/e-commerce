<template>
  <div class="productList">
      <figure class="image is-3by4">
      <img @click="redirect(product._id)" :src="product.imageSource" alt="Product image">
      </figure>
      <h4>{{product.name}}</h4>
      <p>{{itemPrice}}</p>
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
  align-items: center;
}

</style>
