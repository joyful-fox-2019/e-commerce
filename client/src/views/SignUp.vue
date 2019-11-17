<template>
  <div class="SignUp mt-5">
    <Navbar/>
      <br>
      <h2 style="text-align: center; font-family: 'Pacifico', cursive;" class="mt-5">Sign Up</h2>
      <br>
      <div class="container mr-6 ml-6">
        <br>
    <b-form @reset="onReset" v-if="show" style="width:500px;" class="m-auto">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      ><b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
      ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button @click.prevent="signUp" variant="dark">Sign Up</b-button>
      <b-button type="reset" @ click.prevent="onReset" variant="danger">Reset</b-button>
    </b-form>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'SignUp',
  components: {
    Navbar
  },
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    // onSubmit (evt) {
    //   evt.preventDefault()
    // },
    signUp () {
      console.log('masuk sign up')
      const data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      console.log(this.$store.dispatch)
      this.$store
        .dispatch('register', data)
        .then(() => {
          this.$router.push('signin')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
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
