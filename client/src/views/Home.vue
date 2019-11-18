<template>
  <div class="home">
    

          <div class="container text-center my-auto masthead" style="margin-top: 100px;">
            <h1 class="mb-1">𝐖𝐞𝐥𝐥-𝐂𝐨𝐦𝐦𝐞𝐫𝐜𝐞</h1>
            <br>
            <br>
            <a
              class="btn btn-primary btn-xl js-scroll-trigger"
              v-on:click="loginShow"
              href="#"
            >Get Started</a>
          </div>

  
  </div>
</template>

<script>


import store from 'vuex'
export default {

  name: 'home',
  components: {
   
  },
  methods: {
    loginShow() {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>
body {
  background: url("../../public/market2.jpg") no-repeat center center fixed;

  background-size: cover;

  height: 100vh;
}

.masthead {
  min-height: 30rem;
  position: relative;
  display: table;
  width: 100%;
  height: auto;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.masthead h1 {
  font-size: 4rem;
  margin: 0;
  padding: 0;
}


</style>