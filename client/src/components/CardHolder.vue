<template>
  <div id="contentHolder">
    <card v-for="product in products" :key="product.i" :product="product"></card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'


export default {
  components : {
    Card
  },
  methods: {
    getProduct(){
      this.$store.dispatch('products/getProduct')
    }
  },
  computed: {
    ...mapState('products',[
      'products'
    ])
  },
  created(){
    this.getProduct()
  }
}
</script>

<style scoped>
#contentHolder{
  width: 90%;
  margin: 6px auto;
  border-radius: 10px;
  padding: 2px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around
}
</style>