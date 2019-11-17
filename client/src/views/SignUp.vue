<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="green darken-1" dark flat>
                <v-toolbar-title>Register Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signUp" ref="registerForm">
                  <v-text-field label="Full Name" v-model="name" name="name" :rules="nameRules" prepend-icon="person" type="text" />
                  <v-text-field label="Email address" v-model="email" name="email" :rules="emailRules"  prepend-icon="email" type="email" />
                  <v-text-field label="Password" v-model="password" name="password" :rules="passwordRules"  prepend-icon="lock" type="password" />
                  <v-textarea label="Address" v-model="address" name="address" :rules="addressRules" prepend-icon="store"></v-textarea>
                  <v-text-field label="Phone Number" v-model="phone_number" name="phone_number" :rules="phoneRules" prepend-icon="phone" type="text" />
                  <v-card-actions>
                    <v-btn dark class="ma-3" color="green darken-1" router-link to="/">
                        <i class="fas fa-home mr-2"></i>
                        Home
                    </v-btn>
                    <v-spacer />
                    <v-btn dark class="ma-3" color="green darken-1" type="submit">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        Sign Up
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
      <span>Register successfully.</span>
    </v-snackbar>
    <v-snackbar v-model="snackbarError" :timeout="2000" top color="error">
      <span>{{ errorMessage }}</span>
    </v-snackbar>

  </v-app>
</template>

<script>
import axios from '../apis/axios'

export default {
    name: 'SignUp',
    data: () => ({
        name: '',
        email: '',
        password: '',
        address: '',
        phone_number: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length >= 3) || 'Name must be at least 3 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'Invalid e-mail format',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must be at least 8 characters',
        ],
        addressRules: [
            v => !!v || 'Address is required',
            v => (v && v.length >= 3) || 'Address must be at least 3 characters',
        ],
        phoneRules: [
            v => !!v || 'Phone number is required',
            v => (v && v.length >= 10) || 'Phone number must be at least 10 numbers',
        ],
        snackbarSuccess: false,
        snackbarError: false,
        errorMessage: "",
    }),
    methods: {
        signUp() {
            if (this.$refs.registerForm.validate()) {
                axios({
                    method: 'POST',
                    url: '/users/signup',
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        address: this.address,
                        phone_number: this.phone_number
                    }
                })
                .then((response) => {
                    localStorage.setItem('token', response.data.jwt_token);
                    localStorage.setItem('user', JSON.stringify(response.data.user_data));
                    this.$store.commit('SET_TOKEN', response.data.jwt_token);
                    this.$store.commit('SET_USER', response.data.user_data);
                    this.$store.commit('SET_SNACKBAR_HOME', true);
                    this.$store.commit('SET_SNACKBAR_HOME_MESSAGE', 'You have registered successfully');
                    // this.snackbarSuccess = true;
                    this.$router.push('/');
                })
                .catch((err) => {
                    if(err.response.data) {
                        this.errorMessage = err.response.data.message.join(", ");
                        this.snackbarError = true;
                    } 
                    else {
                        console.log(err);
                    }
                });
            }
        },
    }
}
</script>
