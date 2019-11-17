<template>
    <div class="container" style="display:flex; justify-content:center;">
        <div style="display:flex; width:50%; flex-wrap:wrap;">
            <div style="width:100%">
                <h2>Masuk dengan media sosial</h2>
                <!-- <button class="btn btn-danger">
                    <i class="fab fa-google-plus-g mr-2"></i>
                    Google
                </button> -->
                <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    <i class="fab fa-google"></i>
                </g-signin-button>
                <p class="mt-2" style="font-size:12px;">We'll never post to Google without your permission.</p>
                <hr>
            </div>
            <div style="width:100%">
                <h2>Masuk dengan email</h2>
            </div>
            <div style="width:100% font-size:16px; text-align:left;">
                <form @submit.prevent="login()">
                    <label class="mt-2" for="email" style="width:100%; color:black;">Email</label>
                    <input v-model="email" type="text" style="width:100%;" placeholder="Email" required>
                    <label class="mt-2" for="email" style="width:100%; color:black;">Password</label>
                    <input v-model="password" id="password" type="password" style="width:100%;" placeholder="Password" required>
                    <input class="mt-2" type="checkbox" @click="myFunction()"><span class="ml-2">Tampilkan Password</span>
                    <input class="btn submit mt-4" type="submit" value="Masuk Sekarang" style="width:100%; background-color:#4daf4e; color:white;">
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import Swal from 'sweetalert2'
import axios from '../apis/server'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      googleSignInParams: {
        client_id: '472366340893-1d0sajo3etaeietgu9c3f7t28iq6a4cb.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      axios({
        url: '/users/googleSign',
        method: 'POST',
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          this.$store.commit('setLogin')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSignInError () {
      Swal.fire('error', 'internal server eroror', 'error')
    },
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(_ => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
        .catch(err => {
          Swal.fire('errorr', err.response.data.message, 'error')
        })
      this.email = ''
      this.password = ''
    },
    myFunction () {
      var x = document.getElementById('password')
      if (x.type === 'password') {
        x.type = 'text'
      } else {
        x.type = 'password'
      }
    }
  },
  mounted () {
    //   $(document).ready(function () {
    $('.sidebar').mCustomScrollbar({
      theme: 'minimal'
    })

    $('#dismiss, .overlay').on('click', function () {
      $('.sidebar').removeClass('active')
      $('.overlay').fadeOut()
    })

    $('.sidebarCollapse').on('click', function () {
      $('.sidebar').addClass('active')
      $('.overlay').fadeIn()
      $('.collapse.in').toggleClass('in')
      $('a[aria-expanded=true]').attr('aria-expanded', 'false')
    })
    //  });
  }
}
</script>

<style scoped>
.submit:hover {
    background-color:#007944 !important; color:white;
}
.masuk:hover {
    color:#007944 !important;
}
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4daf4e;
  color: #fff;
  box-shadow: 3px 3px 0 #fff;
  cursor: -webkit-grabbing; cursor: grabbing;
}
</style>
