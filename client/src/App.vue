<template>
  <v-app class="app">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Alert></Alert>
    <Loading></Loading>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import Loading from './components/Loading'

export default {
  name: 'App',
  components: {
    Navbar,
    Alert,
    Loading
  },
  created () {
    if (localStorage.getItem('access_token') &&
    localStorage.getItem('_id') &&
    localStorage.getItem('name') &&
    localStorage.getItem('isAdmin')) {
      let user = {
        _id: localStorage.getItem('_id'),
        name: localStorage.getItem('name'),
        isAdmin: true
      }
      this.$store.commit('SET_USER', user)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald|Squada+One&display=swap');

:root {
  --background-color: #FFFFFF;
  --surface-color: #202020;
  --primary-color: #E6252A;
  --secondary-color: #0282F9;
  --on-background-color: #202020;
  --on-surface-color: #FFFFFF;
  --on-primary-color: #FFFFFF;
  --on-secondary-color: #FEFEFE;
}
.bg-standard {
  background: var(--background-color) !important;
  color: var(--on-background-color) !important;
}
.bg-surface {
  background: var(--surface-color) !important;
  color: var(--on-surface-color) !important;
}
.bg-primary {
  background: var(--primary-color) !important;
  color: var(--on-primary-color) !important;
}
.bg-secondary {
  background: var(--secondary-color) !important;
  color: var(--on-secondary-color) !important;
}
.t-primary {
  color: var(--primary-color) !important;
}
.t-secondary {
  color: var(--secondary-color) !important;
}
.clickable {
  cursor: pointer;
}
.full-width {
  width: 100% !important;
}
hr {
  border-top: 1px solid #E0E0E0;
  width: 80%;
  margin: auto;
}
.alert {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  margin-right: 10%;
}
.app {
  font-family: 'Oswald', sans-serif !important;
  padding-bottom: 50px;
}
v-btn {
  font-family: 'Squada One', cursive !important;
}
.logo {
  font-family: 'Squada One', cursive !important;
  height: 90% !important;
  font-size: 35px;
  width: 160px;
  font-weight: bold;
  margin: auto;
  background: rgb(230,37,42);
  background: linear-gradient(90deg, rgba(230,37,42,1) 0%, rgba(2,130,249,1) 100%);
  color: #FFFFFF;
}
.narrow-container {
  max-width: 500px !important;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
}
.parallax-layer {
  background-color: rgba(230, 37, 42, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  font-size: 60px;
  font-weight: bold;
}
</style>
