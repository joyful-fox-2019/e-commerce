<template>
  <div id="formRegister">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        :dense=true
        filled
        v-model="username"
        label="Username"
        type="text"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please input your username']"
      />
      <q-input
        :dense=true
        filled
        v-model="email"
        label="Email"
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please input your email']"
      />
      <q-input
        :dense=true
        filled
        v-model="password"
        label="Password"
        type="password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please input your password']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" id="submitButton"/>
      </div>
    </q-form>
    <hr>
    <q-btn
      no-caps
      size="sm" 
      color="primary"
      class="full-width"
      label="Login using google"
      style="margin-bottom: 3px"
      @click="google" />
    <!-- <q-btn
      no-caps
      size="sm" 
      color="black"
      class="text-white full-width" 
      label="Login using github" /> -->
        <div style="margin-top: 10px; ">
      <a href="https://github.com/login/oauth/authorize?client_id=021468bd25787be80587&scope=user:email" id="git">
            Sign in using Github
            </a>
      </div>
  </div>  
</template>

<script>
import verifyToken from '../../config/jwt'

export default {
  data(){
    return {
      username : '',
      email : '',
      password : ''
    }
  },
  methods : {
    onSubmit () {
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$q.loading.show()
      this.$store.dispatch('register',payload)
        .then(()=>{
          this.$q.loading.hide()
      this.$store.dispatch('users/getProfile')
          this.email=''
          this.password=''
          this.username=''
          this.checkAdmin()
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        })
        .catch((error)=>{
          this.$q.loading.hide()
          console.log(error);
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `${error.data.arr.join('-')}`
          })
        })
    },
    google(){
    this.$gAuth.signIn()
      .then(GoogleUser => {
        this.isSignIn = this.$gAuth.isAuthorized
        let id_token = GoogleUser.getAuthResponse().id_token
        // let profile = GoogleUser.getBasicProfile()
        this.$q.loading.show()
        this.$store.dispatch('google',id_token)
          .then(_ => {
            this.$q.loading.hide()
            this.$store.dispatch('users/getProfile')
            this.checkAdmin()
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'done',
              message: 'Logged in'
            })
          })
          .catch((error)=>{
            this.$q.loading.hide()
          console.log(error);
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `${error.data.message}`
          })
        })
      })
      .catch(err=>{
        console.log(err)
      })
    },
    checkAdmin(){
      let token = localStorage.getItem('token')
      let admin = verifyToken(token).admin
      this.$store.commit('SET_ADMIN',admin)
    }
  }

}
</script>

<style scoped>
#formRegister{
  padding: 10px;
}
#submitButton{
  font-size: 10px;
}
#git{
  padding: 5px;
  background-color: grey;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  width: 100%
}
</style>