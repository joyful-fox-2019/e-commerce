<template>
  <div class="home">
    <Navbar></Navbar>
          <div class="container">
            <div class="rom mt-5">
                <div class="col" style="font-family: 'Pacifico', cursive;">
                    <br>
                    <br>
                    <h1 style="font-size:50px;">Click</h1>
                    <h4>Keep Classy and Syar'i ...</h4>
                    <br>
                </div>
            </div>
        </div>
    <Carousel></Carousel>
    <DisplayItems class="mt-5"></DisplayItems>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import DisplayItems from '@/components/DisplayItems.vue'
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'home',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    Navbar,
    DisplayItems,
    Carousel
  },
  created () {
    if (localStorage.getItem('token')) this.isLogin = true
  }
}
</script>

<style scoped>

</style>
