<template>
  <div>
    <router-link class="a" to="/">Home</router-link>
    <b-card class="text-center" title="Please Sign Up" style="width: 50%; margin: 5% auto;">
      <b-form @submit.prevent="registerUser" v-if="show" autocomplete="off">
        <b-form-input
          id="input-3"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter Name"
        ></b-form-input>
        <b-form-input
          id="input-4"
          v-model="form.address"
          type="text"
          required
          placeholder="Enter Full_address"
        ></b-form-input>

        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
        <b-form-group
          id="input-group-2"
          label-for="input-2"
          description="Minimum password length is 7"
        >
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter Password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Sign Up</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        address: ""
      },
      show: true
    };
  },
  methods: {
    registerUser() {
      let { email, password, name, address } = this.form;
      axios({
        url: "http://localhost:3000/users/register",
        method: "POST",
        data: {
          email,
          password,
          name,
          full_address: address
        }
      })
        .then(({ data }) => {
          this.$router.push("/login");
          this.form.email = "";
          this.form.password = "";
          this.form.name = "";
          this.form.address = "";
          this.show = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
#input-1,
#input-2,
#input-3,
#input-4 {
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
