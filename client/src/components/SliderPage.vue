<template>
    <div>
        <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000;"
            fade
            indicators
            img-width="1024"
            img-height="300"
        >
            <b-carousel-slide
            img-src="https://storage.googleapis.com/bucket-mini-ecommerce/img1.jpg"
            >
            <div class="content-slider1">
            </div>
        
            </b-carousel-slide>
            <b-carousel-slide
            
            img-src="https://storage.googleapis.com/bucket-mini-ecommerce/img2.jpg"
            ></b-carousel-slide>
             <b-carousel-slide
           
            img-src="https://storage.googleapis.com/bucket-mini-ecommerce/img3.jpg"
            ></b-carousel-slide>
            <b-carousel-slide
            
            img-src="https://storage.googleapis.com/bucket-mini-ecommerce/img4.jpg"
            ></b-carousel-slide>
        </b-carousel>
    </div>
  
</template>

<script>
export default {

}
</script>

<style>
.content-slider1 {
    position: absolute;
    bottom: 150px;
    left: 15%;
    z-index: 10;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #fff;
    text-align: center;
}




</style>