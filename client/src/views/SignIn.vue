<template>
  <div class="SignIn mt-5">
    <Navbar/>
      <br>
      <h2 style="text-align: center; font-family: 'Pacifico', cursive;" class="mt-5">Sign In</h2>
      <br>
      <div class="container">
      <br>
    <b-form @submit="signIn" @reset="onReset" v-if="show" style="width:500px;" class="m-auto">
      <b-form-group id="input-group-2" label="Name/Email" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.identity"
          required
          placeholder="Enter name or email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Password" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button  @click.prevent="signIn" variant="dark">Sign In</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'SignIn',
  components: {
    Navbar
  },
  data () {
    return {
      form: {
        identity: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    // onSubmit (evt) {
    //   evt.preventDefault()
    // },
    signIn () {
      console.log('masuk sign in')
      const data = {
        identity: this.form.identity,
        password: this.form.password
      }
      console.log(data)
      this.$store
        .dispatch('login', data)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.$swal('error',err[0],'error')
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.identity = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
