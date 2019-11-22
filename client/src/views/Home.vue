<template>
 
    <div>
    <h2> List Product </h2>
    <div class="q-pa-md row items-start q-gutter-md">
      <Card v-for="product in products" :key=product._id :product=product ></Card>
    </div>
    </div>
</template>

<style>
</style>

<script>
import Card from '../components/Card';
import { mapState } from "vuex";
export default {
  name: 'PageHome',
  components: {
    Card
  },
  computed: mapState([
    'products'
  ]),
  mounted () {
    this.$store.dispatch('product')
  }
}
</script>
