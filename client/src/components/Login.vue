<template>
    <div class="container RegisterLogin">
    <div class="wrapper">
      <div class="image" data-type="bg" data-src="../assets/login.jpg" style="background-image: url('../assets/login.jpg');"></div>
      <img src="../assets/login1.jpg" alt="login image">
      <div class="text">
        <div class="container text">
          <h4>Login</h4>
          <div>
            <input v-model="email" class="input" type="email" placeholder="Email" value>
            <input v-model="password" class="input" type="password" placeholder="Password" value>
            <div class="button first">
              <span @click="login" class="button-text">Login</span>
            </div>
            <div class="button second">
              <span @click="$router.push('/users/register')" class="button-text">I don't have account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.axios.post(`/users/login`, {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$router.push('/')
          localStorage.setItem('token', data.token)
          console.log(data)
          // if (data.user.role === `admin`) {
          //   localStorage.setItem('isAdmin', true)
          // }
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
