<template>
  <div id="product" style="margin: 30px 0;">
    <div class="container is-fluid">
      <div class="media">
        <div class="media-left">
          <figure class="image is-square" style="width: 300px;">
            <img :src="images[0]" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ name }}</p>
          <p class="subtitle is-6"><strong>Rp {{ formatPrice }}</strong></p>
          <b-taglist>
            <b-tag type="is-info">First</b-tag>
            <b-tag type="is-info">Second</b-tag>
            <b-tag type="is-info">Third</b-tag>
            <b-tag type="is-info">Fourth</b-tag>
            <b-tag type="is-info">Fifth</b-tag>
          </b-taglist>
          <div class="buttons">
            <b-button type="is-info"
              icon-left="cart">
              Add to Cart
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      name: '',
      price: 0,
      stock: 0,
      images: []
    }
  },
  computed: {
    formatPrice () {
      return (this.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  },
  methods: {
    fetchProduct () {
      this.$store
        .dispatch('getProductId', {
          id: this.$route.params.id
        })
        .then(data => {
          this.name = data.name
          this.price = data.price
          this.stock = data.stock
          this.images = data.images
        })
        .catch(({ data }) => {
          data.message.forEach(errMsg => {
            this.$store.state.Toast.fire({
              icon: 'error',
              title: errMsg
            })
          })
        })
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.media {
  width: 100%;
}
.media-content {
  padding: 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
