<template>
  <section id="form-sign-in-join" class="columns">
    <form @submit.prevent="login" class="form-container-left column">
      <div class="header">
        <h1 class="is-size-4">Sign in</h1>
      </div>
      <b-field>
        <b-input v-model="loginEmail" type="email" placeholder="Email"></b-input>
      </b-field>
      <b-field>
        <b-input v-model="loginPassword" type="password" placeholder="Password" password-reveal></b-input>
      </b-field>
      <div class="buttons">
        <input class="button is-fullwidth is-primary" type="submit" value="Sign in" />
        <GoogleSignInButton />
      </div>
    </form>

    <div class="middle column is-one-fifth"></div>

    <form @submit.prevent="register" class="form-container-right column">
      <div class="header">
        <h1 class="is-size-4">Join</h1>
      </div>
      <b-field>
        <b-input v-model="registName" placeholder="Name"></b-input>
      </b-field>
      <b-field>
        <b-input v-model="registEmail" type="email" placeholder="Email"></b-input>
      </b-field>
      <b-field>
        <b-input v-model="registPassword" type="password" placeholder="Password" password-reveal></b-input>
      </b-field>
      <div class="buttons">
        <input class="button is-fullwidth is-primary" type="submit" value="Create your account" />
      </div>
    </form>
  </section>
</template>

<script>
import GoogleSignInButton from "../components/GoogleSignInButton";
import axios from "../../config/axios";

export default {
  name: "form-sign-in-join",

  data() {
    return {
        registName: "",
        registEmail: "",
        registPassword: "",

        loginEmail: "",
        loginPassword: ""
    };
  },

  methods: {
    toast(message) {
      this.$buefy.toast.open(message);
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: "is-success"
      });
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"
      });
    },

    login: function () {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
        .then(({data}) => {
          // console.log("ini data di sign in form", data);
          localStorage.setItem("access_token", data.access_token)
          this.$store.dispatch('checkToken')
          this.success(data.message)
          this.$router.push('/')
        })
        .catch(err => {
          this.danger(err.response.data.messages[0])
        })
    },

    register: function () {
      // eslint-disable-next-line no-console
      console.log("masuk register");
      axios({
        method: "post",
        url: "/users/register",
        data: {
          name: this.registName,
          email: this.registEmail,
          password: this.registPassword
        }
      })
        .then(({ data }) => {
          // eslint-disable-next-line no-console
          console.log("ini response di register", data);
          localStorage.setItem("access_token", data.access_token);
          this.$emit("check-token");
          this.success(data.message);
          this.$router.push('/');
        })
        .catch(err => {
          // console.log("ini err di register", err)
          this.danger(err.response.data.messages[0]);
        });
    }
  },

  components: {
    GoogleSignInButton
  }
};
</script>

<style scoped>
#form-sign-in-join {
  padding: 5% 10%;
}

.form-container-left {
  background-color: white;
  padding: 30px 50px 50px 30px;
  border-radius: 5% 0 0 5%;
}

.form-container-right {
  background-color: white;
  padding: 30px 30px 50px 50px;
  border-radius: 0% 5% 5% 0%;
}

.middle {
  background-color: #f2effc;
}

.header {
  margin-bottom: 25px;
}

.buttons {
  margin-top: 25px;
}

@media only screen and (max-width: 770px) {
  .form-container-left {
    background-color: white;
    padding: 50px 70px 70px 50px;
    border-radius: 5% 5% 0 0%;
  }

  .form-container-right {
    background-color: white;
    padding: 50px 50px 70px 70px;
    border-radius: 0% 0% 5% 5%;
  }
}
</style>