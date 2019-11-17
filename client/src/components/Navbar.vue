<template>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user">User</router-link> |
      <router-link to="/user/register">Register</router-link> |
      <router-link to="/user/login">Login</router-link> |
      <router-link to="/user/login/justapage">JustAnotherPage</router-link> -->

      <!-- tityaravy -->
      <nav class="nav">
        <div class="nav_container">
          <div class="nav_links nav_links--left">
              <div style="text-decoration: none; font-family: 'Raleway', sans-serif; letter-spacing: 6px;  text-transform: uppercase; cursor: pointer;" class="nav_logo" @click="$router.push('/collections')">Collections</div>
          </div>
          <div style="text-decoration: none; font-family: 'Petit Formal Script', cursive; font-size: 30px; cursor: pointer;" class="nav_logo" @click="$router.push('/')">Poterié Indulgence</div>
          <div class="nav_links nav_links--right">
            <div v-if="!isLogin" style="text-decoration: none; font-family: 'Raleway', sans-serif; letter-spacing: 6px;  text-transform: uppercase; cursor: pointer; " class="nav_logo" @click="$router.push('/users/login')">Account</div>
            <div v-if="isLogin && !isAdmin" style="text-decoration: none; font-family: 'Raleway', sans-serif; letter-spacing: 6px;  text-transform: uppercase; cursor: pointer; " class="nav_logo" @click="$router.push('/cart')">Cart</div>
            <div v-if="isLogin && isAdmin" style="text-decoration: none; font-family: 'Raleway', sans-serif; letter-spacing: 6px;  text-transform: uppercase; cursor: pointer; " class="nav_logo" @click="$router.push('/products/add')">+Product</div>
            <div v-if="isLogin" @click="removeToken" style="text-decoration: none; font-family: 'Raleway', sans-serif; letter-spacing: 6px;  text-transform: uppercase; cursor: pointer;" class="nav_logo">Logout</div>
          </div>
        </div>
      </nav>
      <!-- tityaravy  -->
    </div>
</template>

<script>
export default {
  methods: {
    removeToken () {
      this.$router.push('/')
      localStorage.removeItem('token')
      if (localStorage.removeItem('isAdmin')) {
        localStorage.removeItem('isAdmin')
      }

    }
  },
  computed: {
    isLogin () {
      return localStorage.getItem('token')
    },
    isAdmin () {
      console.log(localStorage.getItem('isAdmin'))
      return localStorage.getItem('isAdmin')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Muli|Open+Sans+Condensed:300&display=swap');
@import url('https://fonts.googleapis.com/css?family=Caveat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Petit+Formal+Script&display=swap');
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

.nav_container {
  display: flex;
  justify-content: space-around;
  margin : 3% 100px;
}

.nav_links {
  display: flex;
  justify-content: space-around;
  width: 270px;
}
</style>
