<template>
  <div id="app">
    <div id="nav" class="sticky-top">
        <div class="mb-4">
            <!-- gunakan sticky-top untuk navbar -->
              <nav class="navbar navbar-expand-md navbar-light bg-white d-flex justify-content-between p-0 border">
                  <div class="nav navbar d-flex justify-content-start">
                      <div class="">                          
                          <router-link style="font-family: 'Lobster', cursive;" class="nav-link text-success h1" to="/">Buka Toko</router-link>
                      </div>                 
                  </div>
                  <ul class="nav justify-content-end navbar-nav">
                      <li class="nav-item pr-3">
                          <router-link class="btn btn-outline-success" to="/cart"><i class="fa fa-shopping-cart pr-2"></i>my Cart</router-link>
                      </li>
                          <li class="nav-item pr-3 " v-if="!this.$store.state.isLogin">
                              <router-link class="btn btn-outline-success" to="/login"><i class="fa fa-sign-in pr-2"></i> Sign in</router-link>
                          </li>
                          <li class="nav-item pr-3" v-if="!this.$store.state.isLogin">
                              <router-link class="btn btn-outline-success" to="/register"><i class="fa fa-user-plus pr-2"></i>Register</router-link>
                          </li>
                      <div v-if="this.$store.state.isLogin">
                          <li class="nav-item pr-3">
                              <button @click.prevent="logout" class="btn btn-outline-danger" to="/"><i class="fa fa-sign-out pr-2"></i>Logout</button>
                          </li>
                      </div>
                  </ul>
              </nav>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>

.nav {
  padding-top: 0px !important;
  padding-bottom : 0px !important;
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>

<script>
export default {
  methods : {
    checkLogin() {
      console.log('masuk checkLogin')
      if (localStorage.getItem('token')) {
          this.$store.dispatch('findUser')
          this.$store.commit('setLogin', true)
          this.$store.dispatch('findTransaction')
      } else {
          this.$store.commit('setLogin', false)
      }
    },
    logout() {
      console.log('masuk logout')
      localStorage.removeItem('token')
      this.$router.push("/login")
      this.checkLogin()
    }
  },
  created () {
    console.log('masuk app')
    this.checkLogin()
    this.$store.dispatch('getAllProducts')
  }
}
</script>
