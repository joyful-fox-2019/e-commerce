<template>
<div class="container">
    <ul class="nav justify-content-center align-items-center">
        <li class="nav-item">
            <a class="nav-link" href="#" v-on:click.prevent="goHome">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" v-on:click.prevent="showProduct">Shoes</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#login">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="modal" data-target="#register">Register</a>
        </li>
        <li v-if="isLogin" class="right-side nav-item">
          <a v-on:click.prevent="goCart"><i class="fas fa-shopping-cart"></i></a>
        </li>
        <li v-if="isLogin" class="right-side d-flex align-items-center">
          <span class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdownMenuButton"><i class="fas fa-user"></i></span>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Hai {{username || usernameBuatNavbar}}</a>
              <a class="dropdown-item" href="#">Edit Profile</a>
              <a v-on:click.prevent="logout" class="dropdown-item" href="#">Logout</a>
            </div>
        </li>
    </ul>
    <!-- Register -->
    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
                            </div>
                            <input v-model="userReg" type="text" class="form-control" id="inputUsername" placeholder="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                            </div>
                            <input v-model="emailReg" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
                            </div>
                            <input v-model="passReg" type="password" class="form-control" id="inputPassword" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary" v-on:click.prevent="registerForm" data-dismiss="modal">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Login -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                            </div>
                            <input v-model="emailLog" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
                            </div>
                            <input v-model="passLog" type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary" v-on:click.prevent="loginForm" data-dismiss="modal">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Swal from 'sweetalert2'

export default {
  data () {
    return {
      userReg: '',
      emailReg: '',
      passReg: '',
      emailLog: '',
      passLog: '',
      isLogin: false,
      username: ''
    }
  },
  methods: {
    registerForm () {
      let data = {
        username: this.userReg,
        email: this.emailReg,
        password: this.passReg
      }
      this.$store.dispatch('register', data)
        .then(response => {
          this.userReg = ''
          this.emailReg = ''
          this.passReg = ''
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `${response.data.username}, register is success!`
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: `${err.response.data.message[0]}`
          })
        })
    },
    loginForm () {
      let data = {
        email: this.emailLog,
        password: this.passLog
      }
      this.$store.dispatch('login', data)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Welcome, ${response.data.user.username} !`
          })
          this.isLogin = true
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', response.data.user.username)
          this.username = localStorage.getItem('user')
          this.$router.push('/main-page')
          this.$store.commit('CHANGE_USER_LOGIN', response.data.user.role)
          this.emailLog = ''
          this.passLog = ''
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: `${err.response.data.message}`
          })
        })
    },
    logout () {
      Swal.fire({
        icon: 'success',
        title: 'Logout',
        text: `${localStorage.getItem('user')} logout success !`
      })
      this.isLogin = false
      localStorage.clear()
      this.$router.push('/')
    },
    showProduct () {
      let roleUser = this.$store.state.userlogin
      if (roleUser === 'admin') {
        this.$router.push('admin-page')
      } else if (roleUser === 'user') {
        this.$router.push('customer-page')
      }
    },
    goHome () {
      this.$router.push('/')
    },
    goCart () {
      this.$router.push('/cart')
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  },
  computed: {
    usernameBuatNavbar () {
      return localStorage.getItem('user')
    }
  }
}
</script>

<style scoped>
.nav{
    background-color: black;
    color: white;
}
a{
    text-decoration: none;
    color: white;
}

li{
    cursor: pointer;
}

.right-side{
  margin: 0px 10px;
  color: white
}

.dropdown-menu{
  background-color: black;
}
</style>
