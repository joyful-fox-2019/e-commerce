<template>
  <div id="app">
    <Navbar></Navbar>

    <router-view />

    <footer class="footer">
      <div class="container" style=" text-align:center;">
        <small class="text-muted">Copyright © 2019 minima. by/afifahrahmak/</small>
      </div>
    </footer>

    <ModalLogin v-on:loginsuccess="loginsuccess"></ModalLogin>
    <ModalRegister></ModalRegister>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Navbar from "./components/Navbar.vue";
import ModalLogin from "./components/ModalLogin.vue";
import ModalRegister from "./components/ModalRegister.vue";
import axios from "../src/config/api";

export default {
  components: {
    Navbar,
    ModalLogin,
    ModalRegister
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("isLogin", true);
    }
  },
  data() {
    return {
      isLogin: false,
      productList: [],
      searchResult: [],
      isAdmin: "",
      searchInput: ""
    };
  },
  methods: {
    loginsuccess() {
      this.isLogin = true;
      this.isAdmin = localStorage.getItem("isAdmin");
      this.fetchProducts();
      this.$router.push("/products");
    },
    signOut() {
      localStorage.clear();
      this.isLogin = false;
      this.isAdmin = "";
      Swal.fire("Logged out", "Have a nice day", "success");
      this.$router.push("/");
    }
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Abril+Fatface|Poppins&display=swap");
html {
  position: relative;
  min-height: 100%;
}
body {
  font-family: "Poppins", sans-serif;
  margin-bottom: 90px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #f5f5f5;
}
</style>
