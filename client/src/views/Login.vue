<template>
  <section class="fdb-block py-0">
    <div class="container py-2 my-5" style="background-image: url(imgs/shapes/4.svg);">
      <div class=" row justify-content-end">
        <div class="col-10 col-md-8 col-lg-6 col-xl-5 text-left border px-3 pb-4 pt-2 bg-white rounded shadow-lg">
          <div class="fdb-box col-sm-10 offset-1 my-4">
            <div class="row">
              <div class="col">
                <h1 style="font-family: 'Be Vietnam', sans-serif;">Sign in</h1>
                <p class="lead text-justify text-success py-2" style="font-family: 'Chivo', sans-serif;">Login and you can access full content of our website</p>
              </div>
            </div>
            <!-- form mulai disini -->
            <form @submit.prevent="login">
              <div class="row">
                  <div class="col mt-0">
                    <label for="email">Enter your email here</label>
                    <input type="text" class="form-control border" placeholder="Email" v-model="email">
                  </div>
              </div>
              <div class="row mt-3">
                  <div class="col">
                    <label for="password">Enter your password</label>
                    <input type="password" class="form-control" placeholder="Password" v-model="password">
                  </div>
              </div>
              <div class="row mt-4">
                  <div class="col">
                  <input class="btn btn-block btn-outline-success mt-2" type="submit" value="sign in">
                  </div>
              </div>
              <div class="row mt-3">
                
                <template >
                  <g-signin-button
                    class="btn btn-block btn-outline-success mt-2 mx-3"
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError"><i class="fa fa-google pr-2"></i>
                    Sign in with Google
                  </g-signin-button>
                </template>                   
              </div>

              

            </form>
            <!-- form end -->
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</template>
<script>

import axios from '../api/server'
import Swal from 'sweetalert2'
import GSignInButton from 'vue-google-signin-button'

export default {
  components : {
    GSignInButton,
  },
  data () {
    return {
      email: '',
      password: '',
      googleSignInParams : {
        client_id: '173260689440-3sdbbv7j82sd8eevgenhro99aipst4bl.apps.googleusercontent.com',
      },
      
    }
  },
  methods: {
    login () {
      console.log('masuk login')
      axios
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.toHome(data)
          localStorage.setItem('token', data.token)
          Swal.fire(
            'You succesfully login',
            'You can now acces your cart',
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
    },
     onSignInSuccess (googleUser) {
      console.log('masuk login google')
      const profile = googleUser.getBasicProfile() // etc etc
      const id_token = googleUser.getAuthResponse().id_token;      
      axios.
          post('/login-google',{          
              google_token : id_token
          })
          .then(({data}) => {
              console.log(data ,'dapat data')
              localStorage.setItem("token", data.token)     
              this.toHome(data)     
          })
          .catch(err => {
              console.log(err)
              Swal.fire(
                  'Opps ....!',
                  `${err.response.data.msg}`,
                  'error'
              )
          })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    toHome(data) {      
      console.log(data, 'masuk to home')
      this.$router.push('/')
      this.$store.commit('setLogin', true)
      this.$store.commit('setUser', data.user)
    },
    
  }
}
</script>

<style >
.btn { cursor: pointer; }
</style>
