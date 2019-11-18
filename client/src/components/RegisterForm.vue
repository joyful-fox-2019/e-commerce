<template>
  <div>
    <b-container class="py-5 my-5">
      <b-row class="justify-content-end">
        <b-col cols="6"></b-col>
        <b-col cols="4" class="text-left">
          <b-row>
            <b-col>
              <h3>Register</h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-2">
              <input required type="text" class="form-control" v-model="name" placeholder="Name" />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-2">
              <input required type="email" class="form-control" v-model="email" placeholder="Email" />
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <input
                required
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Password"
              />
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <input required type="text" class="form-control" v-model="city" placeholder="City" />
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <button @click.prevent="registerUser" class="btn btn-dark" type="button">Submit</button>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      city: ''
    }
  },
  methods: {
    registerUser () {
      let payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        city: this.city
      }
      this.$store.dispatch('registerUser', payload)
        .then(response => {
          if (response) {
            this.name = ''
            this.email = ''
            this.password = ''
            this.city = ''
            this.$router.push('/auth/login')
          }
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: `${err.response.data.message}`
          })
        })
    }
  }
}
</script>

<style>
</style>
