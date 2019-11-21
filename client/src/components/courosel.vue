<template>
      <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide>
        <!-- ADOBE -->
        <template v-slot:img>
          <img
            class="d-block"
            width="100%"
            height="700"
            src="../img/giphy1.gif"
            alt="image slot"
            caption="First slide"
            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          >
        </template>
      </b-carousel-slide>
      <!-- CORELDRAW -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block"
            width="100%"
            src="../img/ec1.jpg"
            height="700"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <!-- AUTODESK -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block"
            width="100%"
            height="700"
            src="../img/gihs.gif"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <!-- MICROSOFT -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block"
            width="100%"
            height="700"
            src="../img/giphy.gif"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block"
            width="100%"
            height="700"
            src="../img/ec2.jpg"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>
    </b-carousel>
</template>

<script>
export default {

}
</script>

<style>

</style>
