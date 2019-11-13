<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <template v-slot:activator="{ on }">
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn class="bg-surface nav-button" dark v-on="on">SIGN IN</v-btn>
        </v-toolbar-items>
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
                  <v-btn class="bg-surface nav-button" dark v-on="on">SIGN IN</v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </template>
      <v-card>
        <v-form @submit.prevent="register" v-model="valid">
          <v-container>
            <div class="container">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="20"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="10"
                label="Password"
                required
                type="password"
              ></v-text-field>
            </div>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
            >
              Validate
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters'
      ],
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
    register () {
      console.log('register')
    }
  }
}
</script>

<style scoped>
.nav-button {
  padding: 10px !important;
}
</style>
