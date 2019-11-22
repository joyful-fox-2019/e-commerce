<template>
  <div id="app">
    <div>
      <NavBar />
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Navbar'

export default {
  components: {
    NavBar
  },
  methods: {
  },
  created () {
    this.$router.push('/home')
    if(localStorage.getItem('token')) {
      this.$awn.asyncBlock(
        this.$store.dispatch('checkSignIn'),
        null
      )
        .then(data => {
          this.$awn.success(data.msg+`, welcome ${this.$store.state.userSignin.username}`)
        })
        .catch(err => {
          this.$awn.warning(err.response)
          localStorage.removeItem('token')
        })
    }
    this.$awn.asyncBlock(
      this.$store.dispatch('fetchAllProduct'),
      null,
      null,
      'Fetching Data'
    )
      .then(() => {
        return this.$store.dispatch('fetchCategory')
      })
      .then(() => {
      })
      .catch(err => {
        this.$awn.warning(err)
      })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F8F8F8;
  height: 100vh
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
