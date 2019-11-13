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
            img-src="https://www.fruitsiran.com/frontend_assets/images/banner2.jpg">
        </b-carousel-slide>

        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="http://www.paribawala.com/wp-content/uploads/2019/03/Main-Slider.jpg">
        </b-carousel-slide>

        <b-carousel-slide
            img-src="https://barakatfresh.ae/Content/image/Inner%20page%20banner%20fruits%20870pxX300px.jpg"
            style="height:420px; object-fit:cover;">
        </b-carousel-slide>

        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="http://qtamween.com/pub/media/magiccart/magicslider/a/a/aaja.jpg">
        </b-carousel-slide>

        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="https://www.baqalat.net/image/cache/catalog/templet/slider-01-1260x600-1260x600.jpg">
        </b-carousel-slide>

        <b-carousel-slide
            style="height:420px; object-fit:cover;"
            img-src="http://rkrindianonlineshop.com/images/slider4.jpg">
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
