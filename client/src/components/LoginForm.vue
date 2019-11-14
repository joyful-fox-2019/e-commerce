<template>
  <div id="login-card">
    <div class="login-section">
      <h1>Login</h1>
      <br>
      <p>Don't have account? <span style="cursor:pointer; color: black;" @click="toRegister">Register here..</span></p>
    </div>
    <div class="login-section">
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="email">
        <input v-model="password" type="password" placeholder="password">
        <input class="login-btn" type="submit" value="Login">
      </form>
    </div>
    <div class="login-section">
      <p>Or you login via:</p>
      <button id="google-btn">Google</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          localStorage.setItem('token', data.token)
          this.$store.commit('SET_LOGIN_STATUS', true)
          this.$router.push('/')
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', text: response.data.message })
        })
    },
    toRegister () {
      this.$emit('to-register', 'register')
    }
  }
}
</script>

<style>
  h1 {
    font-size: 20px;
  }
  #login-card {
    display: flex;
    flex-direction: column;
    padding: 5px;
    background-color: rgba(245, 245, 220, 0.408);
    margin: 0 auto;
    /* border: 1px solid orange; */
    width: 50%;
  }
  .login-section {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    /* border: 1px solid red; */
  }
  .login-section form {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .login-section input:not(:last-child){
    width: 60%;
    margin: 8px auto;
    padding: 6px;
    background-color: rgba(212, 212, 212, 0.619);
    outline: none;
    color: black;
    border: none;
  }
  .login-section input:not(:last-child):focus {
    border-bottom: 1px solid rgb(2, 161, 145);
    background-color: rgba(253, 253, 253, 0.748);

  }
  .login-btn {
    background-color: rgb(146, 146, 146);
    cursor: pointer;
    width: 60%;
    margin: 8px auto;
    padding: 6px
  }
  .login-btn:hover {
    background-color: rgb(7, 145, 145);
  }
  #google-btn {
    background-color: white;
    cursor: pointer;
    padding: 8px;
    border-radius: 10px;
    margin: 10px auto;
  }
  #google-btn:hover {
    background-color: red;
  }
</style>
