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
              <div class="cool-link" @click="$router.push('/collections')">Collections</div>
          </div>
          <!-- <div style="text-decoration: none; font-family: 'Petit Formal Script', cursive; font-size: 30px; cursor: pointer;" class="nav_logo" @click="$router.push('/')">Clay Potter</div> -->
          <div  class="nav_logo" @click="$router.push('/')">Poterié Indulgence</div>
          <div class="nav_links nav_links--right">
            <div v-if="!isLogin" class="cool-link" @click="$router.push('/users/login')">Account</div>
            <div v-if="isLogin && !isAdmin" class="cool-link" @click="$router.push('/cart')">Cart</div>
            <div v-if="isLogin && isAdmin" class="cool-link" @click="$router.push('/products/add')">+Product</div>
            <div v-if="isLogin" class="cool-link" @click="$router.push('/transaction')">Transactions</div>
            <div v-if="isLogin" @click="logout" class="cool-link">Logout</div>
          </div>
        </div>

      </nav>
      <!-- tityaravy  -->
    </div>
</template>

<script>
export default {
  props: ['isLogin'],
  methods: {
    logout () {
      this.$emit('setIsLogin', false)
      this.$router.push('/')
      localStorage.removeItem('token')
      if (localStorage.removeItem('isAdmin')) {
        localStorage.removeItem('isAdmin')
      }
    }
  },
  computed: {
    // isLogin () {
    //   return localStorage.getItem('token')
    // },
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
  justify-content: space-between;
  align-items: center;
  margin : 3% 100px;
  flex-direction: row
}

@media only screen and (max-width: 600px) {
  .nav_container {
    flex-direction: column
  }
}

.nav_logo {
  text-decoration: none;
  font-family: 'Petit Formal Script', cursive;
  font-size: 30px;
  cursor: pointer;
}

.nav_links {
  display: flex;
  justify-content: space-around;
  width: 270px;

}

li {
    margin-bottom: 10px;
}

.cool-link {
  display: inline-block;
  color: #000;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 6px;
  text-transform: uppercase;
  cursor: pointer;
  padding-right: 30px;
}

.cool-link::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width .3s;
}

.cool-link:hover::after {
    width: 100%;
    transition: width 0.3s;
}

</style>
