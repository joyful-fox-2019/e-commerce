<template>
  <div>
    <router-link class="a" to="/">Home</router-link>
    <b-card class="text-center" title="Please Sign In" style="width: 50%; margin: 5% auto;">
      <b-form @submit.prevent="onSubmit" v-if="show" autocomplete="off">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>

        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
        <b-button type="submit" variant="primary">Sign In</b-button>
      </b-form>
      <p>Or</p>
      <b-button to="/register" type="button" variant="secondary">Sign Up</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit() {
      let email = this.form.email;
      let password = this.form.password;
      axios({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          data.role === "Admin"
            ? this.$store.commit("CHECK_ADMIN", true)
            : this.$store.commit("CHECK_ADMIN", false);
          this.form.email = "";
          this.form.password = "";
          this.$router.push("/");
          this.$store.commit("USER_LOGIN", true);
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
#input-1,
#input-2 {
  margin-bottom: 3%;
}
.a {
  color: black;
  text-decoration: none;
  display: inline-block;
  margin-left: 3%;
  margin-top: 1%;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  background-color: #17a2b8;
  padding: 7px;
  text-align: center;
  border-radius: 15px;
}
.a:hover {
  color: black;
  text-decoration: none;
  letter-spacing: 2px;
  font-weight: bold;
  background-color: aqua;
}
</style>
