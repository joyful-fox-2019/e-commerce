<template>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column is-half">
          <div class="media">
            <div class="media-content" style="width: 40%">
              <p id="product-name" class="title is-4">{{ product.name }}</p>
              <div class="columns">
                <div class="column">
                  <p class="subtitle is-6">sisa stok: {{ product.stock }}</p>
                </div>
                <div class="column">
                  <p class="title is-4">Rp {{ formatPrice }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column"></div>
        <div class="column is-1">
          <div class="media-content">
            <figure class="image is-64x64">
              <img :src="product.images[0]" alt="Image" />
            </figure>
          </div>
        </div>
        <div
          class="column is-1"
          style="display: flex; align-items: center; padding: 0 50px 0 50px;"
        >
          <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
            <b-icon icon="dots-horizontal" slot="trigger"></b-icon>
            <b-dropdown-item aria-role="listitem" @click="updateProduct">Update</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Delete</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProductAdmin',
  props: [
    'product'
  ],
  computed: {
    formatPrice () {
      return (this.product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
  methods: {
    updateProduct () {
      this.$router.push(`/form-product/${this.product._id}`)
    }
  }
}
</script>

<style scoped>
#product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
