<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Bubblebeam</b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-if="!$store.state.isLogin && this.$route.name !='LoginRegister'" @click.prevent="goToLoginPage">Login / Register</b-button>
        <b-button v-if="!$store.state.isLogin && this.$route.name !='home'" @click.prevent="goToHomePage">Home</b-button>
        <b-button v-if="$store.state.isLogin" @click.prevent="logout"> <i class="fas fa-sign-out-alt"></i>Logout</b-button>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  methods: {
    goToLoginPage () {
      this.$router.push('/login')
    },
    goToHomePage () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('setLogin', false)
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push('/')
    }
  },
  created () {
    console.log(this.$route.name)
  }
}
</script>

<style>

</style>
