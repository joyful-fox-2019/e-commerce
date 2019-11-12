<template>
  <div class="home">
    <FeaturedProduct></FeaturedProduct>
    <div class="mt-10">
    </div>
    <v-row class="text-center ma-2">
      <v-col md="2" offset-md="1" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2 product-img clickable"
        ></v-img>
        <div class="mt-5">
          Future Foundation #4
        </div>
        <div>
          <small></small>
        </div>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2 product-img clickable"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2 product-img clickable"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2 product-img clickable"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2 product-img clickable"
        ></v-img>
      </v-col>
      <v-col md="2" offset-md="1" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2"
        ></v-img>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="0.7"
          class="grey lighten-2"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import FeaturedProduct from '../components/FeaturedProduct'

export default {
  name: 'home',
  components: {
    FeaturedProduct
  }
}
</script>

<style scoped>
.product-img {
  box-shadow: 0px 36px 37px -24px rgba(148,148,148,0.82);
  position: relative;
  top: 0;
  transition: top ease 0.3s;
}
.product-img:hover {
  top: -10px;
}
</style>
