<template>
  <div id="app">
    <Navbar @check-this="checkThis" :access-token="access_token"/>
    <router-view/>
  </div>
</template>

<script>
import Buefy from "buefy";
// import 'buefy/dist/buefy.css'
import Vue from "vue";
import router from "../router";
import store from "./store"

Vue.use(Buefy);

import Navbar from './components/Navbar'
import { mapState } from 'vuex'

export default {
  name: "app",

  data: () => ({
    this: this
  }),

  methods: {
    toast(message) {
      this.$buefy.toast.open(message);
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: "is-success"
      });
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"
      });
    },

    checkThis: function () {
      console.log('ini this store', this.$store)
    }

    // signOut: function () {
    //   console.log("this dan this store", this, this.$store);
    //   localStorage.removeItem('access_token')
    //   this.success('Successfully signed out!')
    //   this.$router.push('/')
    // }
  },

  watch: {
    access_token: function () {
      console.log('ini access token', this.access_token)
    }
  },
  computed: {...mapState(['access_token'])},

  router, store,

  components: {
    Navbar
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  background-image: url("./assets/1511.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

</style>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
