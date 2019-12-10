<template>
  <div id="app">
    <div>
      <navibar id="top-nav" />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navibar from '@/components/Navibar.vue'
export default {
  components: {
    Navibar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('loginTrue')
    } else {
      this.$store.commit('loginFalse')
    }
  }
}
</script>
<style>
#app {
  font-family: "Motiva Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#top-nav {
  box-shadow: 0 .25rem .25rem rgba(0,0,0,.25),inset 0 -1px 5px rgba(0,0,0,.25);
  background: #563d7c;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
