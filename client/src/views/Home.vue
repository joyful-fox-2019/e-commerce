<template>
  <div class="home">
    <div class="container mt-5">
      <Carousel />
    </div>

  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
export default {
  name: 'home',
  components: {
    Carousel
  }
}
</script>
