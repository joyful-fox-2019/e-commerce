<template>
    <div class="container RegisterLogin">
    <div class="wrapper">
      <div class="image" data-type="bg" data-src="../assets/login.jpg" style="background-image: url('../assets/login.jpg');"></div>
      <img src="../assets/login1.jpg" alt="login image">
      <div class="text">
        <div class="container text">
          <h4>Login</h4>
          <form @submit.prevent="login">
            <input v-model="email" class="input" type="email" placeholder="Email" value>
            <input v-model="password" class="input" type="password" placeholder="Password" value>
            <div >
              <b-button native-type="submit">Login</b-button>
            </div>
            <div class="button second">
              <span @click="$router.push('/users/register')" class="button-text">I don't have account</span>
            </div>
          </form>
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
      console.log('hayolo login gakkkkk')

      this.axios.post(`/users/login`, {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          this.$emit('setIsLogin', true)
          console.log(data, 'iyaaaaaaaa')
          this.$router.push('/')
          localStorage.setItem('token', data.token)
          console.log(data.user.role, 'rolenya apaaaaa')

          if (data.user.role === `admin`) {
            localStorage.setItem('isAdmin', true)
          }
        })
        .catch(err => {
          console.log(err, 'aaaaa')
          this.$emit('alert', err)
        })
    }
  }

}
</script>

<style>

</style>
