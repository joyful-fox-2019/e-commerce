<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.authDialog" persistent max-width="450">
      <template v-slot:activator="{ on }">
        <div class="hidden-sm-and-down">
          <v-btn v-if="!$store.state.user._id" @click="setForm('login')" class="bg-surface nav-button" dark v-on="on">SIGN IN</v-btn>
          <v-btn v-if="$store.state.user._id" @click="signout" class="bg-surface nav-button" dark>SIGN OUT</v-btn>
        </div>
        <v-toolbar-items class="hidden-md-and-up">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon class="bg-surface nav-button">
                <v-icon>mdi-view-headline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn v-if="!$store.state.user._id" @click="setForm('login')" class="bg-surface nav-button" dark v-on="on">SIGN IN</v-btn>
                  <v-btn v-if="$store.state.user._id" @click="signout" class="bg-surface nav-button" dark>SIGN OUT</v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </template>
      <v-card>
        <div class="container text-right">
          <div class="container">
            <v-icon @click="$store.commit('SET_AUTH_DIALOG', false)" class="clickable">mdi-close</v-icon>
          </div>
          <div class="text-center logo">
            OMNIVERSE
          </div>
        </div>
        <LoginForm v-if="form === 'login'" @setForm="setForm"></LoginForm>
        <RegisterForm v-if="form !== 'login'" @setForm="setForm"></RegisterForm>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
  data () {
    return {
      form: 'login'
    }
  },
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    setForm (form) {
      this.form = form
    },
    signout () {
      let user = {
        _id: '',
        name: '',
        isAdmin: false
      }
      this.$store.commit('SET_USER', user)
      localStorage.removeItem('_id')
      localStorage.removeItem('name')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('access_token')
    }
  }
}
</script>
