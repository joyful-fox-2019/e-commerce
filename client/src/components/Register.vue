<template>
  <div class="container RegisterLogin">
    <div class="wrapper">
      <div class="image" data-type="bg" data-src="../assets/register.jpg" style="background-image: url('../assets/register.jpg');"></div>
      <img src="../assets/register2b.jpg" alt="regeister image">
      <div class="text">
        <div class="container text">
          <h4>Register</h4>
          <div>
            <input v-model="username" class="input" type="text" placeholder="Username" value>
            <input v-model="email" class="input" type="email" placeholder="Email" value>
            <input v-model="password" class="input" type="password" placeholder="Password" value>
            <div class="button first">
              <span @click="register" class="button-text">Register</span>
            </div>
            <div class="button second">
              <span @click="$router.push('/users/login')" class="button-text">I have an account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data: function () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.axios.post(`/users/register`, {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
