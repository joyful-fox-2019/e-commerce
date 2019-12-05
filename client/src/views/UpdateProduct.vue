<template>
  <div>
    <v-parallax
      height="300"
      src="https://cdn.wallpapersafari.com/98/36/IwpZT5.jpg"
    >
    <div class="parallax-layer text-center">
      UPDATE COMIC
    </div>
    </v-parallax>
    <div class="narrow-container mt-10">
      <UpdateProductForm v-if="product._id" :product="product"></UpdateProductForm>
    </div>
  </div>
</template>

<script>
import UpdateProductForm from '../components/UpdateProductForm'
import { mapState } from 'vuex'

export default {
  name: 'UpdateProduct',
  components: {
    UpdateProductForm
  },
  methods: {
    getProduct () {
      this.$store.dispatch('getProduct', this.$route.params.id)
    }
  },
  created () {
    this.getProduct()
  },
  computed: mapState(['product'])
}
</script>

<style>
</style>
