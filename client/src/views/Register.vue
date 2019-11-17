<template>
  <section class="fdb-block py-0">
  <div class="container py-2 my-5" style="background-image: url(imgs/shapes/4.svg);">
    <div class=" row justify-content-end">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5 text-left border px-3 pb-4 pt-2 bg-white rounded shadow-lg">
        <div class="fdb-box col-sm-10 offset-1 my-4">
          <div class="row">
            <div class="col">
              <h1 style="font-family: 'Be Vietnam', sans-serif;">Register</h1>
              <p class="lead text-justify text-success py-2" style="font-family: 'Chivo', sans-serif;">New member ?, please register to our website for free</p>
            </div>
          </div>
          <!-- form mulai disini -->
          <form @submit.prevent="register">
            <div class="row">
                <div class="col mt-0">
                  <label for="password">Enter your Username</label>
                <input type="text" class="form-control" placeholder="Username" v-model="username">
                </div>
            </div>
            <div class="row">
                <div class="col mt-3">
                  <label for="email">Enter your email here</label>
                <input type="text" class="form-control" placeholder="Email" v-model="email">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                  <label for="password">Enter your password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="password">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                <input class="btn btn-outline-success btn-block mt-2" type="submit" value="register">
                </div>
            </div>
          </form>
          <!-- form end -->
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>

import axios from '../api/server'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
        username : '',
        email: '',
        password: ''
    }
  },
  methods: {
    register () {
        console.log('masuk register')
        axios
            .post('/register', {
                username : this.username,
                email: this.email,
                password: this.password
                })
            .then(({ data }) => {
                this.$router.push('/login')
                Swal.fire(
                    'New User Created!',
                    'Your account has been registered',
                    'success'
                )
            })
            .catch(err => {
                console.log(err, 'ini error')
                Swal.fire(
                    'Opps ....!',
                    `${err.response.data.msg}`,
                    'error'
                )
            })
    }
  }
}
</script>

<style scoped>

</style>
