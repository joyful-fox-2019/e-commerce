<template>
  <div class="home">
    <nav-bar></nav-bar>
    <list-product-all></list-product-all>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '../components/NavBar.vue'
import ListProductAll from '../components/ListProductAll.vue'
export default {
  name: 'home',
  components: {
    NavBar,
    ListProductAll
  }
}
</script>
