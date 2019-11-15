<template>
  <div class="text-center" >
    <button @click="back" class="btn btn-sm btn-info ml-3 mr-auto">Back</button>
    <form @submit.prevent="register" class="form-signin text-white">
      <h1> <strong>E-COM </strong> <span> <img class="mb-4" src="https://avatars0.githubusercontent.com/u/53108094?s=460&v=4" alt="" width="72" height="72"> </span></h1>
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputUserName" class="sr-only">Username</label>
      <input v-model="registerUsername" type="userName" id="inputUserName" class="form-control my-2" placeholder="Username">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="registerEmail" type="text" id="inputEmail" class="form-control my-2" placeholder="Email address">
      <select v-model="role" class="form-control" id="role">
        <option value="" selected disabled hidden>Your Role</option>
        <option>seller</option>
        <option>buyer</option>
      </select>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="registerPassword" type="password" id="inputPassword" class="form-control my-2" placeholder="Password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register!</button>
      <p class="mt-3 text-muted">&copy; E-COM 2019</p>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../myaxios/axios'
export default {
  data () {
    return {
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      role: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    register () {
      axios.post('/register', {
        username: this.registerUsername,
        email: this.registerEmail,
        role: this.role,
        password: this.registerPassword
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Registered',
            text: `Hi ${data.username}, you're now a member of E-COM`
          })
          this.registerUsername = ''
          this.registerEmail = ''
          this.registerPassword = ''
          this.$router.push('/login')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    }
  }
}
</script>

<style scoped>

div {
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 20px;
  background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
  url(https://i0.wp.com/goldenharebooks.com/wp-content/uploads/2017/01/AdobeStock_70869411.jpeg?ssl=1);
  background-size:cover;
  background-position: center;
}

.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 10px;
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
