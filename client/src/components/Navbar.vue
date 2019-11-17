<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item @click.native="checkThis" tag="router-link" :to="{ path: '/' }">
        <img src="../assets/bookplus-logo.png" alt="Bookplus logo" />
        <h1>Book+</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">
        <router-link to="/">Home</router-link>
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">About</b-navbar-item>
        <b-navbar-item href="#">Contact</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <b-navbar-item @click.prevent="showCart" v-if="isLoggedIn" href="">
          <img
            class="shopping-cart-img"
            src="https://icon-library.net/images/shopping-cart-icon-png-transparent/shopping-cart-icon-png-transparent-27.jpg"
            alt="cart-icon"
            srcset
          />
        </b-navbar-item>
        <div class="buttons">
          <router-link 
            v-if="!isLoggedIn" 
            class="button is-primary" 
            to="/signinjoin">Sign in / join</router-link>

          <router-link
            @click.native="signOut()"
            v-if="isLoggedIn"
            class="button is-primary"
            to="/signout"
          >Sign out</router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
// import axios from "../../config/axios";
import { mapState } from 'vuex'

export default {
  name: "navbar",

  props: ["accessToken"],

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
  
    showCart() {
      this.$router.push('/cart')
    },
    // checkThis() {
    //   this.$emit("check-this");
    // },
    signOut() {
      localStorage.removeItem('access_token')
      this.success('Successfully signed out!')
      this.$store.dispatch('checkToken')
      this.$router.push('/')
    }
  },
  
  computed: {
    ...mapState(['isLoggedIn'])
  }
};
</script>

<style scoped>
</style>