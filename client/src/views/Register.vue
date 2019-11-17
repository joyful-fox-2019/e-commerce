<template>
  <div class="container py-5 my-5" style="background-image: url(imgs/shapes/4.svg);">
    <div class="row justify-content-end">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5 text-left">
        <div class="fdb-box">
          <div class="row">
            <div class="col">
              <h1>Register</h1>
            </div>
          </div>
          <div class="row">
            <div class="col mt-4">
              <input type="text" v-model="email" class="form-control" placeholder="Email" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="text" v-model="username" class="form-control" placeholder="Username" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="password" v-model="password" class="form-control" placeholder="Password" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <button class="btn btn-primary" @click.prevent="onRegister" type="button">Submit</button>
              <p class="text-right">
                <router-link to="/login">Login</router-link>
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
  name: 'Register',
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    onRegister () {
      axios({
        method: 'post',
        url: '/register',
        data: {
          email: this.email,
          username: this.username,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Register success',
            icon: 'success'
          })
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  }
}
</script>

<style>
</style>
