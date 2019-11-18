<template>
    <div class="login d-flex justify-content-center align-items-center">
        <div class="form">
        <div class="x w-100 text-right">
            <i @click="close" class="fas fa-times-circle text-secondary"></i>
        </div>

        <div class="d-flex flex-column justify-content-center align-items-center">
            <h1>Login</h1>
                <form @submit.prevent="login" action="">
                    <input v-model="email" class="input" type="text" placeholder="email">
                    <input v-model="password" class="input" type="password" placeholder="password">
                    <input class="btn btn-success w-50" type="submit" value="Login">
                </form>
                <a class="toRegiter" @click.prevent="changePage('/register')" href="">Don't have account ? register</a>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    changePage (link) {
      this.$router.push(link)
      this.$emit('close')
    },
    login () {
      let email = this.email
      let password = this.password
      this.$store.dispatch('LOGIN', { email, password })
        .then(() => {
          this.email = ''
          this.password = ''
          if (localStorage.getItem('token')) {
            this.close()
          }
        })
    }
  }
}
</script>

<style scoped>

.login {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}

.form{
    width: 400px;
    height: 300px;
    background-color: white;
    box-shadow: -1px 1px 11px 0px rgba(0, 0, 0, 0.39);
    border-radius: 15px;
    padding: 15px;;
}

.input{
    width: 80%;
    padding: 8px 10px;
    margin: 10px 0;
    border-radius: 15px;
    border: none;
    background-color: rgb(233, 233, 233);
}

.x {
    font-size: 17px;
    color: rgba(0, 0, 0, 0.26);
    cursor: pointer;
}

.toRegiter {
    font-size: 12px;
    margin-top: 10px;
}

</style>
