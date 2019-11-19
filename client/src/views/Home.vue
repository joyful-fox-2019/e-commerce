<template>
  <div class="">
    <div class=" home jumbotron w-full p-64">
      <div class="title flex w-full justify-center flex-wrap items-center">
        <div class="welcome">Welcome to bikelah</div>
        <div id="first-text">Put fun</div>
        <div id="second-text">
          <span>between your legs</span>
        </div>
      </div>
        <div class="mx-auto">
          <button class="p-4 m-10 bg-yellow-500 hover:bg-red-300 text-black text-2xl rounded" style="opacity: 90%;" @click="toProducts">Get Started</button>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'home',
  methods: {
    toProducts () {
      this.$router.push('/products')
    }
  }
}
</script>
<style scoped>
  .home {
    background-image: url('https://cdn.mos.cms.futurecdn.net/dpA5bpmPcBM6rPszKB9SpH.jpg');
    -webkit-filter: grayscale(100%);
    filter: opacity(45%);
    min-height: 92vh;
  }
  .welcome {
    font-size: 8em;
    display: block;
    color: #FB4264;
    width: 100%;
    animation: welcome 1s ease infinite;
    -moz-animation: welcome 1s ease infinite;
    -webkit-animation: welcome 1s ease infinite;
  }
  @keyframes welcome {
  0%,
  100% {
    text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914;
    color: #FED128;
  }
  50% {
    text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A;
    color: #806914;
  }
}
  .title div {
    display:inline-block;
    overflow:hidden;
    white-space:nowrap;
  }
  #first-text {
    animation: showup 7s infinite;
    font-size: 4em;
    font-family: 'Satisfy', cursive;
    text-shadow: 2px 2px 4px #000000;
    color: white;
  }
  #second-text {
    width:0px;
    animation: reveal 7s infinite;
    font-size: 4em;
    font-family: 'Satisfy', cursive;
    text-shadow: 2px 2px 4px #000000;
    color: white;
  }
  #second-text span {
    margin-left:-355px;
    animation: slidein 7s infinite;
  }

  @keyframes showup {
    0% {opacity:0;}
    20% {opacity:1;}
    80% {opacity:1;}
    100% {opacity:0;}
  }

  @keyframes slidein {
      0% { margin-left:-800px; }
      20% { margin-left:-800px; }
      35% { margin-left:0px; }
      100% { margin-left:0px; }
  }

  @keyframes reveal {
      0% {opacity:0;width:0px;}
      20% {opacity:1;width:0px;}
      30% {width:355px;}
      80% {opacity:1;}
      100% {opacity:0;width:355px;}
  }
</style>
