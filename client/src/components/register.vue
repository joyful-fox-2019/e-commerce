<template>
    <div class="container">
    <b-jumbotron class="mt-5">
    <template v-slot:header>Register</template>
    <template v-slot:lead>
        selamat datang silahkan register terlebih dahulu
    </template>
    <hr class="my-4">
        <form>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Name</label>
                    <input v-model="name" type="text" class="form-control text-center" name="last_name" id="last_name"
                        placeholder="Name" aria-describedby="helpId">
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
                        <label for="last_name">Choose Your Image</label>
                    <div class="custom-file">
                        <input v-on:change="imageInput" type="file" class="custom-file-input" id="validatedCustomFile" required>
                        <label  class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="text-center">
                <button @click.prevent="register" class="btn btn-primary" type="submit" >Register</button>
            </div>
        </form>
        <hr>
    <template>
        sudah memiliki akun?
        <router-link to="/login" @click="$store.commit('SETTER_LOGINREGIST')">
            <input class="btn btn-sm btnHoverOne" type="submit" value="masuk sekarang">
        </router-link>
    </template>
    <div class="text-center mt-2">
        <input class="btn btn-sm btn-success" type="submit" @click="$router.push('/'), $store.commit('SETTER_LOGINREGIST')" value="Back">
    </div>
  </b-jumbotron>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'register',
  data () {
      return {
          name: '',
          email: '',
          password: '',
          image: ''
      }
  },
  methods: {
      imageInput(){
          this.image = event.target.files[0]
      },
      register(){
          let formData = new FormData()
          formData.append("name",this.name)
          formData.append("email",this.email)
          formData.append("password",this.password)
          formData.append("imgUrl",this.image)
          Swal.showLoading()
          this.$store.dispatch('createUser',formData)
            .then(user=>{
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
                  title: 'Signup in successfully'
                })
                this.$router.go(-1)
            })
            .catch(err=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Register Failed!"
                });
            })
      }
  }
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
