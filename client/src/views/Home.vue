<template>
  <div class="home">
    <audio controls autoplay loop style="display:none;">
      <source src="../assets/music/home.mp3" type="audio/mpeg">
    </audio>
    <app-navbartop />
    <div id="contens">
        <!--header-->
        <div id="header-cover">
          <div class="row" id="mainMenu" style="margin-top:105px; margin-bottom:150px;">
            <img src="../assets/images/logoHome.png" alt="logoMenu" style="position: absolute; left: 38%; top: 4%;">
            <b-nav>
              <b-button variant="primary">Item Mall</b-button>
              <b-button class="ml-5" variant="primary">News</b-button>
            </b-nav>
            <b-nav>
              <b-button variant="primary">Contact</b-button>
              <b-button class="ml-5" variant="primary">Background</b-button>
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
              <!--mainheader-->
              <div class="content-wrapper">
                <div class="subtitle">
                  <span>Item Mall</span>
                </div>
                <button @click="buttonChange('bestitem')" style="margin-top:30px; margin-right:10px;">
                  <img v-if="best" src="../assets/images/items/item_best_on.jpg" alt="bestitem">
                  <img v-if="!best" src="../assets/images/items/item_best_off.jpg" alt="bestitem">
                </button>
                <button @click="buttonChange('newitem')" style="margin-top:30px;">
                    <img v-if="neww" src="../assets/images/items/item_new_on.jpg" alt="newitem">
                    <img v-if="!neww" src="../assets/images/items/item_new_off.jpg" alt="newitem">
                </button>
                <app-itemmall />
                <app-bestpick />
              </div>
              <!--end-->
          </div>
      </div>
  </div>
</template>

<script>
import NavbarTop from '@/components/landingPage/Navbar.vue'
import ItemMall from '@/views/ItemMall.vue'
import BestPick from '@/components/listItem/BestPick.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    'app-navbartop': NavbarTop,
    'app-itemmall': ItemMall,
    'app-bestpick': BestPick
  },
  computed: {
    ...mapGetters(['infoUserLogin'])
  },
  data () {
    return {
      slide: 0,
      sliding: null,
      best: true,
      neww: false
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    buttonChange (value) {
      if (value === 'bestitem') {
        this.$router.push('/home')
        this.best = true
        this.neww = false
      } else {
        this.neww = true
        this.best = false
        this.$router.push('/home/newitem')
      }
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500&display=swap');
  .home {
    background-image: url('../assets/images/bg_top.jpg'), url('../assets/images/content_bg.jpg');
    background-position: 50% -5%;
    height: auto;
    font-family: 'Montserrat', sans-serif;
    background-repeat:no-repeat, repeat-x, repeat-y;
  }
  .subtitle {
    background-image: url('../assets/images/main_header.jpg');
    height: 50px;
    padding: 2px 10px;
    font-size: 30px;
    background-size: cover;
    color: white;
  }
  .content-wrapper {
    background-color: rgb(237, 233, 232);
    padding: 10px 10px;
    margin-top: 30px;
    float: left;
    width: 70%;
  }
  #contens {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #main-content {
    margin-top: 400px;
    width: 1120px;
    background-image: url('../assets/images/content_bg.jpg');
    box-shadow: 0px 1px 7px #737373;
    display: inline-block;
    padding: 22px 29px;
    transform: translate(8%, -50%);
  }
  #header-cover {
    margin-top: 75px;
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
    background-image: url('../assets/images/menu_bg.png');
    background-size: cover;
    justify-content: space-around;
    padding: 20px 0px;
    font-size: 18px;
  }
  .links {
    display: flex;
    align-items: center;
  }
</style>
