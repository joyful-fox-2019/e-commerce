<template>
  <v-form @submit.prevent="login" v-model="valid">
  <v-container>
    <div class="container">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
        type="password"
        outlined
      ></v-text-field>
      <div @click="showAdminPassword ? showAdminPassword = false : showAdminPassword = true" class="clickable t-primary">
        Register as admin?
      </div>
      <v-text-field
        v-if="showAdminPassword"
        v-model="adminPassword"
        label="Admin Password"
        required
        type="password"
        class="mt-4"
        outlined
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        class="mt-4 full-width bg-primary"
        type="submit"
      >
        SIGN UP
      </v-btn>
      <hr class="mt-5 bg-standard">
      <div class="container text-center">
        Already have an account? <strong @click="toLogin" class="t-secondary clickable">Sign In</strong>
      </div>
    </div>
  </v-container>
</v-form>
</template>

<script>

export default {
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 6 || 'password must be more than 6 characters'
      ],
      adminPassword: '',
      adminPasswordRules: [
        v => !!v || 'Admin password is required'
      ],
      showAdminPassword: false
    }
  },
  methods: {
    login () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        adminPassword: this.adminPassword
      }
      this.$store.dispatch('register', payload)
    },
    toLogin () {
      this.$emit('setForm', 'login')
    }
  }
}
</script>

<style>

</style>
