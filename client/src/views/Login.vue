<template>
  <div class="container">
    <Navbar/>
    <div class="row">
      <div class="col-sm">
        <form>
          <h3>Login</h3>
          <div class="form-group">
            <label >Email address</label>
            <input type="email" class="form-control" placeholder="Enter email" v-model="loginEmail">
            {{ loginEmail }}
          </div>
          <div class="form-group">
            <label >Password</label>
            <input type="password" class="form-control" placeholder="Password">
          </div>
          <button type="submit" class="btn" style="background-color: #222222; color: white;" >Submit</button>
        </form>
      </div>

      <div class="col-sm">
        test
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
      set(){
        this.$store.commit('CHANGE_LOGIN_EMAIL')
      }
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>

</style>