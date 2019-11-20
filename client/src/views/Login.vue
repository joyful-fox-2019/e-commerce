<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-sm">
        <form @submit.prevent="login()">
          <h3>Login</h3>
          <div class="form-group">
            <label >Email address</label>
            <input type="email" class="form-control" placeholder="Enter email" v-model="loginEmail">
          </div>
          <div class="form-group">
            <label >Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="loginPassword">
          </div>
          <button type="submit" class="btn" style="background-color: #222222; color: white; width: 100%">Login</button>
        </form>
      </div>

      <div class="col-sm">
        <form @submit.prevent="register()">
          <h3>Register</h3>
          <div class="form-group">
            <label >Username</label>
            <input type="text" class="form-control" placeholder="Enter username" v-model="registerUsername">
          </div>
          <div class="form-group">
            <label >Email address</label>
            <input type="email" class="form-control" placeholder="Enter email" v-model="registerEmail">
          </div>
          <div class="form-group">
            <label >Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="registerPassword">
          </div>
          <button type="submit" class="btn" style="background-color: #222222; color: white; width: 100%">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  computed: {
    loginEmail: {
      get(){
        return this.$store.state.login.email
      },
      set(value){
        this.$store.commit('CHANGE_LOGIN_EMAIL', value)
      }
    },
    loginPassword: {
      get(){
        return this.$store.state.login.password
      },
      set(value) {
        this.$store.commit('CHANGE_LOGIN_PASSWORD', value)
      }
    },
    registerEmail: {
      get(){
        return this.$store.state.register.email
      },
      set(value){
        this.$store.commit('CHANGE_REGISTER_EMAIL', value)
      }
    },
    registerUsername: {
      get(){
        return this.$store.state.register.username
      },
      set(value){
        this.$store.commit('CHANGE_REGISTER_USERNAME', value)
      }
    },
    registerPassword: {
      get(){
        return this.$store.state.register.password
      },
      set(value){
        this.$store.commit('CHANGE_REGISTER_PASSWORD', value)
      }
    }
  },
  methods: {
    login(){
      this.$store.dispatch('login')
    },
    register(){
      this.$store.dispatch('register')
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>