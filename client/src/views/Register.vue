<template>
    <div class="container" style="display:flex; justify-content:center;">
        <div style="display:flex; width:50%; flex-wrap:wrap; text-align:left;">
            <div style="width:100%">
                <h3 style="color:black;">Daftar</h3>
            </div>
            <div style="width:100%">
                <p style="line-height:20px; font-size:16px;">Buat akun di Organic untuk kemudahan memesan dan memantau order Anda.</p>
            </div>
            <div style="width:100% font-size:16px;">
                <form @submit.prevent="register()">
                    <label for="name" style="width:100%; color:black;">Nama Lengkap</label>
                    <input v-model="name" type="text" style="width:100%;" placeholder="Nama Lengkap" required>
                    <label class="mt-2" for="email" style="width:100%; color:black;">Email</label>
                    <input v-model="email" type="text" style="width:100%;" placeholder="Email" required>
                    <label class="mt-2" for="email" style="width:100%; color:black;">Password</label>
                    <input v-model="password" id="password" type="password" style="width:100%;" placeholder="Password" required>
                    <input class="mt-2" type="checkbox" @click="myFunction()"><span class="ml-2">Tampilkan Password</span>
                    <input class="btn submit mt-4" type="submit" value="Daftar Sekarang" style="width:100%; background-color:#4daf4e; color:white;">
                </form>
                <div class="mt-4" style="display:flex; font-size:16px;">
                    <div style="width:50%;">
                        <p class="mt-1" style="font-size:16px;">Sudah punya akun?</p>
                    </div>
                    <div style="text-align:right; width:50%;">
                        <router-link to="/user/login" class="btn masuk" style="font-size:16px; background-color:#ebebeb; color:gray;">Masuk</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      let payload = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      this.$store.dispatch('register', payload)
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
            title: 'successfully Register'
          })
        })
        .catch(err => {
          Swal.fire('errorr', err.response.data.message, 'error')
        })
      this.email = ''
      this.password = ''
      this.name = ''
    },
    myFunction () {
      var x = document.getElementById('password')
      if (x.type === 'password') {
        x.type = 'text'
      } else {
        x.type = 'password'
      }
    }
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
</style>
