<template>
  <div>
    <v-parallax
      height="300"
      src="https://cdn.wallpapersafari.com/98/36/IwpZT5.jpg"
      style="background-position: right 20px bottom 10px !important;"
    >
    <div class="parallax-layer text-center">
      ADD NEW COMIC
    </div>
    </v-parallax>
    <div class="narrow-container mt-10">
      <AddProductForm></AddProductForm>
    </div>
  </div>
</template>

<script>
import AddProductForm from '../components/AddProductForm'

export default {
  name: 'AddProduct',
  components: {
    AddProductForm
  }
}
</script>

<style>
</style>
