<template>
  <v-form @submit.prevent="login" v-model="valid">
  <v-container>
    <div class="container">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
        type="password"
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        class="mt-4 full-width bg-primary"
        type="submit"
      >
        SIGN IN
      </v-btn>
      <hr class="mt-5 bg-standard">
      <div class="container">
        <v-btn
          class="mt-4 full-width bg-secondary"
          @click="toRegister"
        >
          CREATE AN ACCOUNT
        </v-btn>
      </div>
    </div>
  </v-container>
</v-form>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  data () {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'password is required',
        v => v.length > 6 || 'password must be more than 6 characters'
      ]
    }
  },
  methods: {
    login () {
      console.log('login')
      axios.post('/users/login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(this.showAlert)
    },
    toRegister () {
      console.log('to register')
      this.$emit('setForm', 'register')
    }
  }
}
</script>

<style>

</style>
