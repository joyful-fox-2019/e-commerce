<template>
  <div class="">
      <nav-bar></nav-bar>
      <div class="d-flex justify-content-center">
        <form action="" id="register" class="container" @submit.prevent="register()">
      <div class="shadow mb-5 bg-white rounded">
        <div class="form-group">
            <h4 class="card-header" style="background-color: #aeddb198;color:#f6f6f6;">Selamat Datang !</h4>
            <label for="name" class="card-text mt-3">Name</label>
            <input type="text" name="name" class="form-control" style="max-width:80%; margin-right:10%; margin-left:10%;" placeholder="Insert your name !" v-model="name">
        </div>
        <div class="form-group">
            <label for="email" class="card-text">E-mail</label>
            <input type="text" name="email" placeholder="Insert your email !" class="form-control" style="max-width:80%; margin-right:10%; margin-left:10%;" v-model="email">
        </div>
        <div class="form-group">
            <label for="password" class="card-text">Password</label>
            <input type="password" name="password" placeholder="Insert your password !" class="form-control" style="max-width:80%; margin-right:10%; margin-left:10%;" v-model="password">
        </div>
        <div class="form-group">
            <label for="role" class="card-text">Role</label>
            <br>
            <select v-model="role" class="form-control" style="max-width:80%; margin-right:10%; margin-left:10%;">
                <option>Buyer</option>
                <option>Seller</option>
            </select>
            <br>
            <button class="btn" type="submit" style="max-width:30%;background-color:#aeddb198; color:#f6f6f6;">Register</button>
        </div>
      </div>

    </form>
      </div>

  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'register',
  components: {
    NavBar
  },
  data: () => {
    return {
      name: '',
      email: '',
      password: '',
      role: ''
    }
  },
  methods: {
    register () {
      let payload = {
        name: this.name,
        password: this.password,
        email: this.email,
        role: this.role
      }
      this.$store.dispatch('register', payload)
      this.name = ''
      this.password = ''
      this.email = ''
      this.role = ''
    }
  }
}
</script>

<style>
#register{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 400px;
    padding: 20px;
    margin-top: 10px;
}
</style>
