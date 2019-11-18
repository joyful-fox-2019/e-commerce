<template>
  <div class="home">
    <audio controls autoplay loop style="display:none;">
      <source src="../assets/music/home.mp3" type="audio/mpeg">
    </audio>
    <app-navbartop />
    <div id="contens">
        <!--header-->
        <div id="header-cover">
          <div class="row" id="mainMenu" style="margin-top:105px;">
            <img src="../assets/images/logoHome.png" alt="logoMenu" style="position: absolute; left: 38%; top: 4%;">
            <b-nav>
              <b-button variant="light">Item Mall</b-button>
              <b-button class="ml-5" variant="light">News</b-button>
            </b-nav>
            <b-nav>
              <b-button variant="light">Contact</b-button>
              <b-button class="ml-5" variant="light">Background</b-button>
            </b-nav>
          </div>
        </div>
        <!--end header-->
            <div id="main-content">
              <!--topban-->
              <div id="top-banner" style="padding: 0; margin: 0">
                <!--slideshow-->
                <b-carousel
                  id="carousel-1"
                  v-model="slide"
                  :interval="4000"
                  controls
                  background="#ababab"
                  img-width="1050"
                  img-height="265"
                  style="margin: 0 auto;position: relative; width: 1060px;height: 265px; background-color: Gray;"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                >
                <b-carousel-slide img-src="https://imgur.com/grAnhHs.jpg">
                </b-carousel-slide>

                <b-carousel-slide img-src="https://imgur.com/4pQe0aw.jpg">
                </b-carousel-slide>

                <b-carousel-slide img-src="https://imgur.com/tqrdrAV.jpg">
                </b-carousel-slide>

                 <b-carousel-slide img-src="https://imgur.com/CG5v4EX.jpg">
                </b-carousel-slide>

                 <b-carousel-slide img-src="https://imgur.com/nZmRKTz.jpg">
                </b-carousel-slide>

                 <b-carousel-slide img-src="https://imgur.com/H9e9q1K.jpg">
                </b-carousel-slide>

                 <b-carousel-slide img-src="https://imgur.com/2GmEhyY.jpg">
                </b-carousel-slide>

                 <b-carousel-slide img-src="https://imgur.com/2thnSJk.jpg">
                </b-carousel-slide>

                 <b-carousel-slide img-src="https://imgur.com/Bqjb5pX.jpg">
                </b-carousel-slide>
                </b-carousel>
                <!--endslide-->
              </div>
              <!--endtopban-->
              <div class="content-wrapper">
                <div class="subtitle">
                    	<span>Item Mall</span>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import NavbarTop from '@/components/landingPage/Navbar.vue'

export default {
  name: 'home',
  components: {
    'app-navbartop': NavbarTop
  },
  data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
}
</script>

<style scoped>
  .home {
    background-image: url('../assets/images/bg_top.jpg');
    background-position: 50% -5%;
    height: auto !important;
  }
  .content-wrapper {
    background-color: rgb(213, 219, 214);
  }
  #contens {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #main-content {
    margin-top: 320px;
    width: 1120px;
    background-image: url('../assets/images/content_bg.jpg');
    box-shadow: 0px 1px 7px #737373;
    display: inline-block;
    padding: 22px 10px;
    transform: translate(8%, -50%);
  }
  #header-cover {
    display: flex;
    justify-content: center;
  }
  #mainMenu {
    width: 1120px;
    /* background-image: url('../assets/images/menu_bg.png'); */
    background-color: rgba(23, 187, 252, 0.5);
    background-size: cover;
    display: flex;
    /* position: absolute; */
    justify-content: space-around;
    padding: 20px 0px;
    font-size: 18px;
  }
  .links {
    display: flex;
    align-items: center;
  }
</style>
