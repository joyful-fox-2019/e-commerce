<template>
  <div class="cartlike">
      <!-- <div style="height:30vh; margin-top: 40vh;" :v-if="myCart.length == 0"> -->
          <!-- <i class="fas fa-info-circle fa-10x"></i> -->
          <!-- <p class="mt-1" style="font-weight:bold; font-size:2em;">Undefined!</p> -->
      <!-- </div> -->
    <!-- LIST Product -->
    <div class="container">
      <div class="jumbotron">

      <!-- </p> -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
// import Item from '@/components/cardCart.vue'
export default {
  name: 'cart',
  components: {
    // 'cart-item': Item
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
