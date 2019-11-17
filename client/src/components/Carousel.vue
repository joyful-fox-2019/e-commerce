<template>
  <div class="container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#fff"
      img-width="1024"
      img-height="280"
      style="text-shadow: 1px 1px 2px #000;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/promo-new%2F1572919597848_promo-new-1572591840374_promo-new_1572587973274_1400x688.jpg?alt=media">
        </b-carousel-slide>

        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/promo-new%2F1573463616884_1400x688.jpg?alt=media">
        </b-carousel-slide>

        <b-carousel-slide
            img-src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/promo-new%2F1572923766330_1400x688.jpg?alt=media"
            style="height:420px; object-fit:cover;">
        </b-carousel-slide>

        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/promo-new%2F1568970610883_1400x688.jpg?alt=media">
        </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style>
.slide {
    border-radius: 50px !important;
}
.carousel-control-prev-icon .carousel-control-next-icon {
    height: 100px !important;
    width: 100px !important;
}

</style>
