<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <navbar />
    <transition appear enter-active-class="animated fadeInUp delay">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import navbar from '@/components/navbar'

export default {
  components: {
    navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('IS_LOGIN')
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  background-color: #F6F6F2;
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a:hover{
  color: #F1C315;
}

#nav a.router-link-exact-active {
  color: #F1C315;
}

.delay{
  animation-delay: .3s;
}
</style>
