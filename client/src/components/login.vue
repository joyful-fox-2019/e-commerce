<template>
    <div class="container">
    <b-jumbotron class="mt-5">
    <template v-slot:header>Login</template>
    <template v-slot:lead>
        selamat datang silahkan login terlebih dahulu
    </template>
    <hr class="my-4">
        <form>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Email</label>
                    <input v-model="email" type="email" class="form-control text-center" name="last_name" id="last_name"
                        placeholder="Email" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Password</label>
                    <input v-model="password" type="password" class="form-control text-center" name="last_name" id="last_name"
                        placeholder="Password" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="text-center">
                <input @click.prevent="login" class="btn btn-primary" type="submit" value="Login">
            </div>
        </form>
        <hr>
    <template>
        tidak memiliki akun?
        <router-link to="/register">
            <input class="btn btn-sm btnHoverOne" type="submit" value="daftar sekarang">
        </router-link>
    </template>
    <div class="text-center mt-2">
        <input class="btn btn-sm btn-success" @click="$store.commit('SET_BACK')" type="submit" @click.prevent="$router.go(-1)" value="Back">
    </div>
  </b-jumbotron>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'login',
  data () {
      return {
          email: '',
          password: ''
      }
  },
  methods: {
    login(){
        let form = {
            email: this.email,
            password: this.password
        }
        // console.log(form);
        this.$store.dispatch('loginUser', form)
            .then(({ data })=>{
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
                  title: 'Signin in successfully'
                })
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                this.$store.commit('SET_BACK')
                this.$store.commit('SET_LOGIN')
                this.$router.go(-1)
            })
            .catch(err=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Signin Failed!"
                });
            })
    }
  },
}
</script>

<style>
.btnHoverOne{
    transition: 0.5s;
}
.btnHoverOne:hover{
    color: blue;
}
</style>
