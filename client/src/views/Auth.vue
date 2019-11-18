<template>
  <section class="container">
    <!-- login -->
    <div class="login">

      <i class="fas fa-sign-in-alt"></i>
      <strong>Welcome!</strong>
      <span>Sign in to your account</span>

      <form @submit.prevent="signIn">
        <fieldset>
          <div class="form">
            <div class="form-row">
              <i class="fas fa-user"></i>
              <label class="form-label" for="input">Email</label>
              <input type="text" class="form-text" v-model="loginEmail">
            </div>
            <div class="form-row">
              <i class="fas fa-eye"></i>
              <label class="form-label" for="input">Password</label>
              <input type="password" class="form-text" v-model="loginPassword">
            </div>
            <div class="form-row button-login">
              <button type="submit" class="btn btn-login">Sign in <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>

    <!-- register -->
    <div class="register">
      <i class="fas fa-user-circle"></i>
      <strong>Create account!</strong>
      <form @submit.prevent="signUp">
        <fieldset>
          <div class="form">
            <div class="form-row">
              <i class="fas fa-user"></i>
              <label class="form-label" for="input">Name</label>
              <input type="text" class="form-text" v-model="registerName">
            </div>
            <div class="form-row">
              <i class="fas fa-envelope"></i>
              <label class="form-label" for="input">E-mail</label>
              <input type="text" class="form-text" v-model="registerEmail">
            </div>
            <div class="form-row">
              <i class="fas fa-lock"></i>
              <label class="form-label" for="input">Password</label>
              <input type="password" class="form-text" v-model="registerPassword">
            </div>
            <div class="form-row button-login">
              <button type="submit" class="btn btn-login">Create <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </fieldset>
      </form>

    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'auth',
  data () {
    return {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    signIn () {
      let data = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      this.$store
        .dispatch('signIn', data)
        .then(result => {
          if (result) {
            this.loginEmail = ''
            this.loginPassword = ''
            Swal.fire(
              'Log in successful',
              '',
              'success'
            )
            localStorage.setItem('token', result)
            this.$router.push(`/cart`)
          }
        })
        .catch(err => {
          this.fireErrorMessage(err.message)
        })
    },
    signUp () {
      let data = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword
      }
      this.$store
        .dispatch('signUp', data)
        .then(result => {
          if (result) {
            this.registerName = ''
            this.registerEmail = ''
            this.registerPassword = ''
            Swal.fire(
              'Registration success!',
              'Please sign in with your new account.',
              'success'
            )
            this.loginEmail = result.email
          }
        })
        .catch(err => {
          console.log(err)
          this.fireErrorMessage(err.message)
        })
    },
    fireErrorMessage (msg) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
body {
    background: #f1f1f1;
    font-family: 'Rubik', sans-serif;
    margin: 0;
    padding: 0;
}
form, fieldset {
    border: 0;
    padding: 0;
    margin: 0;
}
.container {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 50px auto;
    max-width: 1200px;
    width: 100%;
}
@media (max-width: 768px) {
    .container {
        flex-wrap: wrap;
   }
}
.btn {
    align-items: center;
    background: #fc7978;
    border-radius: 3px;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    padding: 15px 45px;
    transition: 0.2s;
}
.btn:hover {
    background: #ffafb0;
    transform: translateY(-2px);
}
.btn .fas.fa-arrow-right {
    color: #fff;
    font-size: 12px;
    line-height: 12px;
    margin: 0 0 0 10px;
}
.register, .login {
    border-radius: 5px;
    box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.10);
    height: auto;
    max-width: 400px;
    padding: 40px 15px;
    text-align: center;
    width: 100%;
}
.register .fas, .login .fas {
    color: #fc7978;
    font-size: 35px;
    margin-bottom: 5px;
}
.register strong, .login strong {
    color: #2f2f2f;
    display: block;
    font-size: 40px;
}
.register span, .login span {
    color: #2f2f2f;
}
.register .create-account, .login .create-account {
    border-top: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding-top: 30px;
}
.register .create-account strong, .login .create-account strong {
    font-size: 16px;
    margin-left: 5px;
    text-decoration: underline;
}
.register, .login {
    background: #fff;
}
.register .form, .login .form {
    margin-top: 30px;
    padding: 0 20px;
}
.register .form .form-row, .login .form .form-row {
    position: relative;
    text-align: left;
}
.register .form .form-row .fas, .login .form .form-row .fas {
    font-size: 15px;
    position: absolute;
    right: 10px;
    top: 30px;
}
.register .form .form-row.bottom, .login .form .form-row.bottom {
    display: flex;
    justify-content: space-between;
}
.register .form .form-row.bottom .forgot, .login .form .form-row.bottom .forgot {
    color: #fc7978;
}
.register .form .form-row.button-login, .login .form .form-row.button-login {
    margin-top: 50px;
}
.register .form .form-row.button-login .fas, .login .form .form-row.button-login .fas {
    position: static;
}
.register .form .form-row .form-check input[type=checkbox] + label, .login .form .form-row .form-check input[type=checkbox] + label {
    color: #555;
    cursor: pointer;
    display: block;
}
.register .form .form-row .form-check input[type=checkbox], .login .form .form-row .form-check input[type=checkbox] {
    display: none;
}
.register .form .form-row .form-check input[type=checkbox] + label:before, .login .form .form-row .form-check input[type=checkbox] + label:before {
    border-radius: 3px;
    border: 1px solid #e2e2e2;
    color: transparent;
    content: "\2714";
    display: inline-block;
    height: 15px;
    margin-right: 5px;
    transition: 0.2s;
    vertical-align: bottom;
    width: 15px;
}
.register .form .form-row .form-check input[type=checkbox] + label:active:before, .login .form .form-row .form-check input[type=checkbox] + label:active:before {
    transform: scale(1.1);
}
.register .form .form-row .form-check input[type=checkbox]:checked + label:before, .login .form .form-row .form-check input[type=checkbox]:checked + label:before {
    background-color: #fc7978;
    border-color: #fc7978;
    color: #fff;
}
.register .form .form-label, .login .form .form-label {
    color: #555;
    font-size: 12px;
}
.register .form-password, .login .form-password, .register .form-text, .login .form-text {
    border-radius: 2px;
    border: 0;
    height: 40px;
    margin-bottom: 20px;
    padding: 0 40px 0 10px;
    width: 100%;
    background: white no-repeat;
    transition: 100ms all linear 0s;
    background-image: linear-gradient(to bottom, #fc7978 0%, #fc7978 90%), linear-gradient(to bottom, #e1e1e1, #e1e1e1);
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}
.register .form-password:focus, .login .form-password:focus, .register .form-text:focus, .login .form-text:focus {
    background-size: 100% 2px, 100% 1px;
    outline: none;
}
.register {
    transform: scale(1.01);
    background-image: radial-gradient(circle farthest-corner at 10% 20%, #fc7978 0%, #fc7978 90%);
}
.register .fas, .register strong {
    color: #fff;
}
.register .form .form-label {
    color: #fff;
}
.register .form .form-row .fas {
    color: #fc7978;
}
.register .form .form-row .button-login {
    margin-top: 20px;
}
.register .btn-login {
    background: #fff;
    color: #555;
}
.register .btn-login .fas.fa-arrow-right {
    color: #555;
}
.register .btn-login:hover {
    background: #d5d7de;
}
.register .create-account {
    color: #fff;
}
.register .social-media {
    color: #fff;
    font-size: 20px;
    margin-top: 10px;
}
.register .social-media .fab {
    margin: 0 3px;
}

</style>
