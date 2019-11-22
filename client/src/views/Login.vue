<template>
    <div>
        <nav-bar></nav-bar>
        <div class="d-flex justify-content-center">
          <form id="login" class="container" @submit.prevent="login()">
            <div class="shadow mb-5 bg-white rounded">
              <div class="form-group">
                <h4 class="card-header" style="background-color: #aeddb198;color:#f6f6f6;">Selamat Datang !</h4>
                <label for="email" class="card-text mt-3">E-mail</label>
                <input type="text" name="email" placeholder="Insert your email !" class="form-control" style="max-width:80%; margin-right:10%; margin-left:10%;" v-model="email" >
              </div>
              <div class="form-group">
                <label for="password" class="card-text">Password</label>
                <br>
                <input type="password" name="password" placeholder="Insert your password !" v-model="password" class="form-control" style="max-width:80%; margin-right:10%; margin-left:10%;">
                <br>
                <button class="btn" type="submit" style="max-width:30%;background-color:#aeddb198; color:#f6f6f6;">Login</button>
              </div>
            </div>
          </form>
        </div>

    </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  name: 'login',
  components: {
    NavBar
  },
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
#login{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 400px;
    padding: 20px;
    margin-top: 10px;
}
</style>
