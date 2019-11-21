<template>
  <div class="home">
    <!-- Corousel -->
    <home-caorousel/>
    <!-- LIST Product -->
    <div class="container mt-3 d-flex flex-row">
      <div class="wrapper">
      <home-item v-for="item in allProduct" :key="item._id" :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import Caurousel from '@/components/courosel.vue'
import Item from '@/components/cardItem.vue'
export default {
  name: 'home',
  components: {
    'home-caorousel': Caurousel,
    'home-item': Item
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  mounted () {
    this.$store.dispatch('getProducts')
  },
  computed: mapState([ 'allProduct' ])
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
