<template>
  <div class="sign-box rounded shadow">
    <div class="d-flex justify-content-center" style="position: relative;top: -100px;">
      <div class="logo-box d-flex justify-content-center align-items-center shadow m-0">
        <img style="width: 90%;" src="../assets/bubblebeam-logo.png" alt="Logo" />
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center mt-3"
      style="position: relative;top: -100px;"
    >
      <div
        v-if="signIn"
        style="width:100%; transition: 0.5s all"
        class="d-flex flex-column justify-content-between align-items-center"
      >
        <h1>Sign In</h1>
        <hr style="width: 80%;border: 1px solid grey;" />
        <form
          class="d-flex flex-column justify-content-start align-items-start mt-3"
          style="width: 70%"
          @submit.prevent="login()"
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="Input email"
            class="form-control"
            v-model="email"
          />
          <label class="mt-2">Password</label>
          <input
            type="password"
            placeholder="Input password"
            class="form-control"
            v-model="password"
          />
          <div class="d-flex justify-content-center align-item-center mt-2" style="width: 100%;">
            <b-button type="submit" class="btn"> <i class="fas fa-sign-in-alt"></i> Login </b-button>
          </div>
        </form>
        <div>
          <h4>
            Need an account ?
            <a href="#" @click.prevent="toRegister"> Register here </a>
          </h4>
        </div>
      </div>
      <div
        v-if="signUp"
        style="width:100%; transition: 0.5s all"
        class="d-flex flex-column justify-content-between align-items-center"
      >
        <h1>Sign Up</h1>
        <hr style="width: 80%;border: 1px solid grey;" />
        <form
          class="d-flex flex-column justify-content-start align-items-start mt-3"
          style="width: 70%"
          @submit.prevent="register"
        >
          <label>Username</label>
          <input
            type="text"
            autocomplete="off"
            placeholder="Input username"
            class="form-control"
            v-model="username"
          />
          <label class="mt-2">Email</label>
          <input
            type="email"
            autocomplete="off"
            placeholder="Input email"
            class="form-control"
            v-model="email"
          />
          <label class="mt-2">Password</label>
          <input
            type="password"
            autocomplete="off"
            placeholder="Input password"
            class="form-control"
            v-model="password"
          />
          <div
            class="d-flex justify-content-center align-item-center mt-2 mb-2"
            style="width: 100%;"
          >
            <b-button type="submit" class="btn">Register</b-button>
          </div>
        </form>
        <div>
          <h4>
            Already a member ?
            <a href="#" @click.prevent="toLogin">Login here</a>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LoginRegisterForm',
  data () {
    return {
      signUp: false,
      signIn: true,
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    toLogin () {
      this.signUp = false
      this.signIn = true
    },
    toRegister () {
      this.signUp = true
      this.signIn = false
    },
    register () {
      axios({
        url: `http://localhost:3000/users/register`,
        method: 'post',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.username = ''
          this.email = ''
          this.password = ''
          this.$store.commit('setLogin', true)
          localStorage.setItem('token', data.token)
          this.$router.push('/')
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Invalid input format`, `error`)
        })
    },
    login () {
      axios({
        url: `http://localhost:3000/users/login`,
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.email = ''
          this.password = ''
          this.$store.commit('setLogin', true)
          localStorage.setItem('token', data.token)
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
          })
          if (data.role === 'customer') {
            this.$router.push('/')
          } else if (data.role === 'admin') {
            this.$router.push('/admin')
          }
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Wrong email or password`, `error`)
        })
    }
  }
}
</script>

<style scoped>
.logo-box {
  left: 50%;
  border-radius: 50%;
  background-color: whitesmoke;
  width: 200px;
  height: 200px;
}
.sign-box {
  width: 70vh;
  /* height: 50vh; */
  /* background-color: whitesmoke; */
  background-color: rgba(245, 245, 245, 0.746);
}
input:hover {
  border-bottom: 3px solid #000;
}
input:focus {
  border-bottom: 3px solid #000;
}
button:hover {
  color: grey;
  transition: 0.7s all;
}
button {
  color: black;
  transition: 0.7s all;
  font-size: 24px;
}
</style>
