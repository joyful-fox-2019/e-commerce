<template>
  <div class="login">
    <div class="avatar">
      <img src="../../assets/images/logoLogin.png" alt="logoLogin">
    </div>

    <h2>Wellcome Seal Lovers</h2>
    <form @submit.prevent="login">
      <div class="box-login">
          <i class="fas fa-envelope"></i>
          <input v-model="formLogin.email" type="email" placeholder="Input Your Email">
      </div>

      <div class="box-login">
        <i class="fas fa-lock"></i>
        <input v-model="formLogin.password" type="password" placeholder="Input Your Password">
      </div>

      <button type="submit" class="btn-login">
        Login
      </button>
    </form>

    <div class="bottom">
      <p @click="changeForm">Register</p>
      <a href="">Forgot Password</a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'formlogin',
  data () {
    return {
      formLogin: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['formNowIn'])
  },
  methods: {
    changeForm () {
      this.$store.dispatch('changeFormAsync', false)
        .then(payload => {
          if (this.$store.state.formLogin === payload) this.$router.push('/register')
        })
        .catch(err => {
          console.log(err)
        })
    },
    login () {
      axios({
        method: 'POST',
        url: baseUrl + '/users/signin',
        data: this.formLogin
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.formLogin.email = ''
          this.formLogin.password = ''
          let payload = {
            name: data.name,
            email: data.email
          }
          return this.$store.dispatch('setUserLoginAsync', payload)
        })
        .then(_ => {
          this.$router.push('/home')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {}
}
</script>

<style scoped>
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    width: 400px;
    box-shadow: 0 0 10px 4px black;
  }
  .avatar img {
    width: 180px;
    height: 130px;
    line-height: 80px;
    text-align: center;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }
  .login h2 {
    text-align: center;
    color: white;
    padding-top: 10px;
    letter-spacing: 5px;
    margin-top: 30px;
  }
  .box-login {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    border-bottom: 2px solid white;
    padding: 8px 0;
  }
  .box-login i {
    font-size: 20px;
    color: white;
    margin-top: 5px;
  }
  .box-login input {
    width: 100%;
    padding: 0 10px;
    background: none;
    outline: none;
    color: white;
    font-size: 18px;
    margin-left: 6px;
  }
  .box-login input::placeholder {
    color: white;
  }
  .btn-login {
    width: 100%;
    background: none;
    padding: 15px;
    border: 1px solid white;
    font-size: 18px;
    letter-spacing: 5px;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-login:hover {
    background: rgba(0, 0, 0, 0.8)
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .bottom p {
    color: white;
    font-size: 15px;
    text-decoration: none;
  }
  .bottom p:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .bottom a {
    color: white;
    font-size: 15px;
    text-decoration: none;
  }
  .bottom a:hover {
    text-decoration: underline;
  }
</style>
