<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="green darken-1" dark flat>
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signIn" ref="loginForm">
                  <v-text-field label="Email address" v-model="email" name="email" :rules="emailRules"  prepend-icon="person" type="email" />
                  <v-text-field label="Password" v-model="password" name="password" :rules="passwordRules"  prepend-icon="lock" type="password" />
                  <div style="margin-top:10px; margin-bottom:20px;">Do not have any account? 
                      <a @click="signUp" style="color:green;"> Sign up here. </a>
                  </div>
                  <v-card-actions>
                    <v-btn dark class="ma-3" color="green darken-1" router-link to="/">
                        <i class="fas fa-home mr-2"></i>
                        Home
                    </v-btn>
                    <v-spacer />
                    <v-btn dark class="ma-3" color="green darken-1" type="submit">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        Sign In
                    </v-btn>
                    </v-card-actions>
                </v-form>
              </v-card-text>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <!-- Snackbars -->
    <v-snackbar v-model="snackbarSuccess" :timeout="2000" top color="success">
      <span>Login successfully.</span>
    </v-snackbar>
    <v-snackbar v-model="snackbarError" :timeout="2000" top color="error">
      <span>{{ errorMessage }}</span>
    </v-snackbar>

  </v-app>
</template>

<script>
import axios from '../apis/axios'

export default {
    name: 'SignIn',
    data: () => ({
        email: '',
        password: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'Invalid e-mail format',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must be at least 8 characters',
        ],
        snackbarSuccess: false,
        snackbarError: false,
        errorMessage: "",
    }),
    methods: {
        signIn() {
            if (this.$refs.loginForm.validate()) {
                axios({
                    method: 'POST',
                    url: '/users/signin',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then((response) => {
                    localStorage.setItem('token', response.data.jwt_token);
                    localStorage.setItem('user', JSON.stringify(response.data.user_data));
                    this.$store.commit('SET_TOKEN', response.data.jwt_token);
                    this.$store.commit('SET_USER', response.data.user_data);
                    this.$store.commit('SET_SNACKBAR_HOME', true);
                    this.$store.commit('SET_SNACKBAR_HOME_MESSAGE', 'You have signed in successfully');
                    // this.snackbarSuccess = true;
                    this.$router.push('/');
                })
                .catch((err) => {
                    if(err.response.data) {
                        this.errorMessage = err.response.data.message;
                        this.snackbarError = true;
                    } 
                    else {
                        console.log(err);
                    }
                });
            }
        },
        signUp() {
            this.$router.push('/signup');
        }
    }
}
</script>
