<template>
  <div id="register-card">
    <div class="register-section">
      <h1>Register</h1>
      <br>
      <p>Already have an account? <span style="cursor:pointer; color: black;" @click="toLogin">Login here..</span></p>
    </div>
    <div class="register-section">
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="username">
        <input v-model="email" type="email" placeholder="email">
        <input v-model="password" type="password" placeholder="password">
        <input class="login-btn" type="submit" value="Register">
      </form>
    </div>
    <div class="register-section">
      <p>Or you login via:</p>
      <button id="google-btn">Google</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'registerForm',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    toLogin () {
      this.$emit('to-login', 'login')
    },
    register () {
      this.$store.dispatch('register', { username: this.username, email: this.email, password: this.password })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.toLogin()
        })
        .catch(({ response }) => {
          let errors = response.data.errors.join(', ')
          this.$notify({ type: 'error', title: response.data.message, text: errors })
        })
    }
  }
}
</script>

<style>
 h1 {
    font-size: 20px;
  }
  #register-card {
    display: flex;
    flex-direction: column;
    padding: 5px;
    background-color: rgba(245, 245, 220, 0.408);
    margin: 0 auto;
    /* border: 1px solid orange; */
    width: 50%;
  }
  .register-section {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    /* border: 1px solid red; */
  }
  .register-section form {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .register-section input:not(:last-child){
    width: 60%;
    margin: 8px auto;
    padding: 6px;
    background-color: rgba(212, 212, 212, 0.619);
    outline: none;
    color: black;
    border: none;
  }
  .register-section input:not(:last-child):focus {
    border-bottom: 1px solid rgb(2, 161, 145);
    background-color: rgba(253, 253, 253, 0.748);

  }
  .register-btn {
    background-color: rgb(146, 146, 146);
    cursor: pointer;
    width: 60%;
    margin: 8px auto;
    padding: 6px
  }
  .register-btn:hover {
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
