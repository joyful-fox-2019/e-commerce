<template>
  <div class="home">
    <div class="landing">
      <div class="pt-5 container landing2"></div>
      <div class="landing1">
        <br />
        <br />
        <br />
        <div class="text-right pt-5 container logo">
          <h3 style="margin-top:18vh;" class="title text-right">minima.</h3>
          <small class="tagline">Furnish your home, Furnish your life</small>
          <br />
          <router-link to="/products">
            <button class="btn btn-outline-dark">Shop Now</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <!-- <div class="univbg row">
        <div class="col xs-12">
          <img class="py-2 img-fluid" src="../assets/landing3.jpg">
        </div>
      </div>-->
      <div style="background-color : rgb(244,244,241)" class="mt-3 row">
        <div class="col-md-3">
          <Figure :pic="pic[0]"></Figure>
        </div>
        <div class="col-md-3">
          <Figure :pic="pic[1]"></Figure>
        </div>
        <div class="col-md-3">
          <Figure :pic="pic[2]"></Figure>
        </div>
        <div class="col-md-3">
          <Figure :pic="pic[3]"></Figure>
        </div>
      </div>

      <div class="container mt-4">
        <div class="row">
          <div class="col-sm-12 col-md-2"></div>
          <div class="col-sm-12 col-md-4">
            <Figure :text="text1" :pic="pic[4]"></Figure>
          </div>
          <div class="col-sm-12 col-md-4">
            <Figure :text="text2" :pic="pic[5]"></Figure>
          </div>
          <div class="col-sm-12 col-md-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Figure from "@/components/Figure";
import Swal from "sweetalert2";
export default {
  components: {
    Figure
  },
  data() {
    return {
      pic: [
        "../assets/img/kursi5.jpg",
        "../assets/img/kursi1.jpg",
        "../assets/img/kursi7.jpg",
        "../assets/img/kursi1.jpg",
        "../assets/img/kursi1.jpg",
        "../assets/img/kursi1.jpg",
        "../assets/img/kursi1.jpg"
      ],
      text1: "Wares",
      text2: "Teas"
    };
  }
};
</script>

<style scoped>
.title {
  /* font-family: "Abril Fatface", cursive; */
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: 4.3rem;
}

.tagline {
  font-family: "Poppins", sans-serif;
  font-weight: lighter;
  font-size: 1.2rem;
}
.logo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: flex-end;
}

.landing {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.landing1 {
  background-color: rgb(241, 241, 241);
  width: 50%;
  height: 100vh;
  /* margin-right: 200px; */
  animation: changeBgTitle 6s normal 0s infinite normal backwards;
  position: relative;
}
.landing2 {
  background-color: rgb(247, 245, 246);
  background-image: url("../../src/assets/img/kursi14.jpg");
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  background-size: unset;
  width: 50%;
  height: 100vh;
  background-position: center center;
  animation: changeBg 9s step-end 0s infinite normal forwards;
  position: relative;
}

@keyframes changeBg {
  0% {
    background-color: rgb(241, 241, 241);
    background-image: url("../../src/assets/img/suculent7.jpg");
  }
  25% {
    /* background-image: url("../../src/assets/kursi2-landing.png"); */
  }
  50% {
    /* background-image: url("../../src/assets/teko1.jpg"); */
  }
}
@keyframes changeBgTitle {
  0% {
    background-color: rgb(241, 241, 241);
    background-image: url("../../src/assets/img/suculent7.jpg");
  }
  25% {
    /* background-image: url("../../src/assets/kursi2-landing.png"); */
  }
  50% {
    /* background-image: url("../../src/assets/teko1.jpg"); */
  }
}
</style>
