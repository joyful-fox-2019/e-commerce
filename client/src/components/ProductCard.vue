<template>
  <div class="container-product">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img @click="redirect(product._id)" :src="product.imageSource" alt="Product image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-12">{{product.name}}</p>
              <p class="subtitle is-6">IDR {{product.price.toLocaleString()}}</p>
            </div>
          </div>
        </div>
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
  }
}
</script>

<style>

</style>
