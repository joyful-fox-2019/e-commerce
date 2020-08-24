<template>
  <div id="app">
    <Navbar :isLogin="isLogin" @setIsLogin="setIsLogin"></Navbar>
    <router-view @alert="alert" @setIsLogin="setIsLogin"></router-view>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false
    }
  },
  components: {
    Navbar
    // ,
    // Footer
  },
  methods: {
    alert (err) {
      // console.log(err.response.data.message, "INI APP");
      if (err.response) {
        this.$buefy.toast.open({
          type: 'is-white',
          message: err.response.data.message
        })
      } else {
        this.$buefy.toast.open({
          type: 'is-white',
          message: `connection failed`
        })
      }
    },
    setIsLogin (status) {
      this.isLogin = status
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  }
}
</script>

<style>

html {
  background-color: #F6EEE2 !important;
  min-height: 100% !important;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    height: 100%;

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
