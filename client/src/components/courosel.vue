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
            src="https://blog.pcm.com/wp-content/uploads/2019/04/1200x500_AdobeCC_BlogBanner_042319_AU-1200x500.jpg"
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
            height="700"
            src="https://www.webtechcoupons.com/wp-content/uploads/2019/05/coreldraw-coupon-code.jpg"
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
            src="https://www.motionmedia.com/product_images/uploaded_images/loyalty-offer.jpg"
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
            src="http://www.office365promocode.com/img/officeimgs/studentoffers1.jpg"
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
            src="https://pics.imgrapid.com/wp-content/uploads/2019/07/09112635/190701-728-360-EURO.jpg"
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
