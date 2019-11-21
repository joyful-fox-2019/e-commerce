<template>
  <div>
      <h1 class="display-3">My Cart</h1>
      <p class="lead"></p>
      <hr class="my-2">
      <p></p>
      <!-- <p class="lead"> -->
    <!-- <a class="btn btn-primary btn-lg" href="Jumbo action link" role="button">Jumbo action name</a> -->
    <div class="wrapper mt-5">
      <cart-item v-for="item in myCart" :key="item._id" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Item from '@/components/cardCart.vue'
export default {
  name: 'mycheckout',
  components: {
    'cart-item': Item
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('getMyCart')
  },
  mounted () {
    this.$store.dispatch('getMyCart')
  },
  computed: mapState([ 'myCart' ])
}
</script>

<style>
.cardHover{
  transition: 0.5s;
}
.cardHover:hover{
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.116);
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row dense;
  grid-gap: 10px;
}
.wrapper > :nth-child(100n + 1){
  grid-column: 1;
}
.wrapper > :nth-child(100n + 2){
  grid-column: 2;
}
.wrapper > :nth-child(100n + 3) {
  grid-column: 3;
}
.wrapper > :nth-child(100n + 4){
  grid-column: 4;
}
</style>
