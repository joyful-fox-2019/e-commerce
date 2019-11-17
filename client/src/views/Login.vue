<template>
    <div id="login" class="text-center text-white">
      <button @click="back" class="btn btn-sm btn-info ml-3 mr-auto">Back</button>
      <form @submit.prevent="login" class="form-signin">
        <h1> <strong>E-COM </strong> <span> <img class="mb-4" src="https://avatars0.githubusercontent.com/u/53108094?s=460&v=4" alt="" width="72" height="72"> </span></h1>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="text" id="inputEmail" class="form-control my-2" placeholder="Email address">
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control my-2" placeholder="Password">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <div class="p-2 d-flex justify-content-center">
            <p class="mb-0 ">Not a member? <a @click="toRegister"><span style="cursor:pointer" class="btn-link">Register Here!</span></a></p>
        </div>
        <p class="mt-5 text-muted">&copy; E-COM 2019</p>
      </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../myaxios/axios'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toRegister () {
      this.$router.push('/register')
    },
    login () {
      axios.post('/login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.payload.username)
          localStorage.setItem('role', data.payload.role)
          Swal.fire({
            icon: 'success',
            title: 'Successfully Login',
            text: `Welcome ${data.payload.username}`
          })
          this.$emit('statusLogin', true)
          this.$emit('statusRole', data.payload.role)
          this.$emit('getProfile')
          if (data.payload.role === 'buyer') {
            this.$emit('getCart')
            this.$emit('getTransactionsBuyer')
          } else {
            this.$emit('getOwnProducts')
            this.$emit('getTransactionsSeller')
          }
          this.$router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  }
}
</script>

<style scoped>
div #login{
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -ms-flex-align: center;
  padding-top: 40px;
  align-items: center;
  background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
  url(https://i0.wp.com/goldenharebooks.com/wp-content/uploads/2017/01/AdobeStock_70869411.jpeg?ssl=1);
  background-size:cover;
  background-position: center;
}

.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
