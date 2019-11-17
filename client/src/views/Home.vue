<template>
  <div >
    <b-container fluid>
      <b-row class="home">
        <b-col id="left-col">
          <Leftbar />
        </b-col>
        <b-col cols="8">
          <Carousel class="mt-2"/>
          <Deck class="mt-3" />
        </b-col>
        <b-col id="right-col"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import Leftbar from '@/components/Leftbar.vue'
import Deck from '@/components/Deck.vue'

export default {
  name: 'home',
  components: {
    Carousel,
    Leftbar,
    Deck
  }
}
</script>
<style scoped>

.home {
  height: 100vh;
  background: #ffffff;
}

#left-col {
  border-right: 1px solid rgba(0,0,0,.1)
}

#right-col {
  border-left: 1px solid rgba(0,0,0,.1)
}

</style>
