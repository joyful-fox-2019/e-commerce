<template>
  <div v-if="!formNowIn" class="register">
    <div class="avatar">
      <img src="../../assets/images/logoLogin.png" alt="logoLogin" />
    </div>
    <h2>Form Register</h2>
    <form @submit.prevent="addUser">
      <div class="box-register">
        <i class="fas fa-user"></i>
        <input v-model="newUser.name" type="text" placeholder="Input Your Name" />
      </div>

      <div class="box-register">
        <i class="fas fa-envelope"></i>
        <input v-model="newUser.email" type="email" placeholder="Input Your Email" />
      </div>

      <div class="box-register">
        <i class="fas fa-lock"></i>
        <input v-model="newUser.password" type="password" placeholder="Input Your Password" />
      </div>

      <button type="submit" class="btn-register">register</button>
    </form>
    <div class="bottom">
      <p @click="changeForm">Back</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
const baseUrl = "http://localhost:3000";

export default {
  name: "formregister",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["formNowIn"])
  },
  methods: {
    changeForm() {
      this.$store
        .dispatch("changeFormAsync", true)
        .then(payload => {
          if (this.$store.state.formLogin === payload) this.$router.go(-1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addUser() {
      this.$store
        .dispatch("setNewUserAsync", this.newUser)
        .then(payload => {
          return axios({
            method: "POST",
            url: baseUrl + "/users/signup",
            data: payload
          });
        })
        .then(respone => {
          console.log("success add user in db");
          this.$store.dispatch("clearNewUser");
          this.changeForm();
          this.newUser.name = "";
          this.newUser.email = "";
          this.newUser.password = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.$store.state.formLogin === true) this.$router.go(-1);
  }
};
</script>

<style scoped>
.register {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  width: 400px;
  box-shadow: 0 0 10px 4px black;
}
.avatar img {
  width: 180px;
  height: 130px;
  line-height: 80px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
}
.register h2 {
  text-align: center;
  color: white;
  padding-top: 10px;
  letter-spacing: 5px;
  margin-top: 30px;
}
.box-register {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 2px solid white;
  padding: 8px 0;
}
.box-register i {
  font-size: 20px;
  color: white;
  margin-top: 5px;
}
.box-register input {
  width: 100%;
  padding: 0 10px;
  background: none;
  outline: none;
  color: white;
  font-size: 18px;
  margin-left: 6px;
}
.box-register input::placeholder {
  color: white;
}
.btn-register {
  width: 100%;
  background: none;
  padding: 15px;
  border: 1px solid white;
  font-size: 18px;
  letter-spacing: 5px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}
.btn-register:hover {
  background: rgba(0, 0, 0, 0.8);
}
.bottom {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.bottom p {
  color: white;
  font-size: 16px;
  text-decoration: none;
}
.bottom p:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
