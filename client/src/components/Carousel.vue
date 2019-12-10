<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="width: 85%; margin:auto"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide img-src="https://storage.cloud.google.com/uapcdn/monhun.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="https://storage.cloud.google.com/uapcdn/deathstand.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="https://storage.cloud.google.com/uapcdn/fm2020.jpg"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style>
</style>
