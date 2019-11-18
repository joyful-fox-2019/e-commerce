<template>
  <v-layout row justify-center dark>
    <v-dialog v-model="show" persistent max-width="400px">
      <v-card>
        <v-card-title primary-title align-center class="headline lighten-2 justify-center">
          Register
        </v-card-title>
        <v-card-text>
          <v-container grid-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-form @submit.prevent="register" id="register-form" xs12>
                   <v-text-field v-model="name" label="Name*" type="text" required
                    :rules="nameRules"></v-text-field>
                    <v-text-field v-model="email" label="Email*" type="email" required
                    :rules="emailRules"></v-text-field>
                    <v-text-field  v-model="adminPassword" v-if="checkbox" label="Admin Password*" type="password" required
                    :rules="passwordRule"></v-text-field>
                    <v-btn type="submit" color="success">Register</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Required Field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="show = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'

export default {
  data () {
    return {
      name: '',
      email: '',
      adminPassword: '',
      checkbox: false,
      nameRules: [
        (v) => v.length > 1 || 'Name length at least 2 characters'
      ],
      emailRules: [
        (v) => v.length > 0 || 'Email is required',
        (v) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) || 'Invalid email address'
      ],
      passwordRule: [
        (v) => !!v || 'Password is required'
      ]
    }
  },
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    register () {
      console.log('register invoked')
      let data = {
        name: this.name,
        email: this.email,
        adminPassword: this.adminPassword
      }
      instance({
        method: 'POST',
        url: '/users/registerAdmin',
        data
      })
        .then(({ data }) => {
          localStorage.token = data.token
          this.$store.commit('setLogin', true)
          this.$store.commit('setUser', data)
          this.$store.dispatch('getOrders')
          this.show = false
          this.$store.commit('SHOW_SNACKBAR', { text: 'Successfully register new user' })
        })
        .catch(error => {
          axiosErrorHandler(error)
        })
    }
  }
}
</script>
