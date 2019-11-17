<template>
    <div>
        <b-navbar type="dark" variant="dark" class="fixed-top">
            <div class="container" style="display: flex; justify-content: space-between">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/"><img src="../assets/logo.png" width="30"></router-link>
                    </b-nav-item>
                    <b-nav-item v-if="isLogin">
                        <router-link to="/cart" style="color:rgba(255, 255, 255, 0.5);">Cart</router-link>
                    </b-nav-item>
                    <b-nav-item v-if="isLogin">
                        <router-link to="/transaction" style="color:rgba(255, 255, 255, 0.5);">Transaction</router-link>
                    </b-nav-item>
                    <b-nav-item v-if="isLogin && isAdmin">
                        <router-link to="/additem" style="color:rgba(255, 255, 255, 0.5);">Add Item</router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link v-if="!isLogin" to="/signup" style="color:rgba(255, 255, 255, 0.5);">Sign Up</router-link>
                    </b-nav-item>
                    <b-nav-item v-if="isLogin" @click.prevent="logout">Sign Out</b-nav-item>
                    <b-nav-item>
                        <router-link to="/signin" v-if="!isLogin" style="color:rgba(255, 255, 255, 0.5);">Sign In</router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </div>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false,
      isAdmin: false
    }
  },
  methods: {
    logout () {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('signin')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (localStorage.getItem('token')) this.isLogin = true
    if (localStorage.getItem('user') === 'admin') this.isAdmin = true
  }
}
</script>

<style scoped>

</style>>
