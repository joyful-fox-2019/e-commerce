<template>
  <div class="container py-5 my-5">
    <div class="row justify-content-end">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5 text-left">
        <div class="fdb-box">
          <div class="row">
            <div class="col">
              <h1>Log In</h1>
            </div>
          </div>
          <div class="row">
            <div class="col mt-4">
              <input type="text" v-model="email" class="form-control" placeholder="Email" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="password" v-model="password" class="form-control" placeholder="Password" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <button class="btn btn-primary" @click="onLogin" type="button">Submit</button>
              <p class="text-right">
                <router-link to="/register">Register</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      axios({
        method: 'post',
        url: '/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$store.commit('loginTrue')
          Swal.fire({
            title: 'Login success',
            icon: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
</style>
