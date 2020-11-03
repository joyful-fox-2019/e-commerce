<template>
  <div>
    <b-navbar
      toggleable="lg"
      :type="type"
      :variant="variant"
      fixed="top"
      v-on:scroll="handleScroll"
      style="transition: 0.8s ease-in-out;"
    >
      <b-navbar-nav v-if="checkLogin">
        <b-nav-item href="#" to="/cart">
          <img src="../assets/shopping-cart.png" alt="cart" />
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="checkLogin && isAdmin">
        <b-nav-item href="#" to="/create">
          <p>| Create</p>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav style="margin-left: 40%;" class="logoHome" v-if="navbarChanged">
        <b-navbar-brand href="#" @click.prevent="homePage">Hoodie Hoo</b-navbar-brand>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <b>User</b>
            </template>
            <b-dropdown-item href="#" v-if="checkLogin" @click="signOut">Sign Out</b-dropdown-item>
            <b-dropdown-item to="/login" href="#" v-else>Sign In</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      variant: "faded",
      type: "light",
      transactionList: [],
      navbarChanged: false
    };
  },
  methods: {
    onSubmit() {
      axios({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(({ data }) => {
          this.$store.commit("USER_LOGIN", true);
          if (data.role === "Admin") {
            localStorage.setItem("role", "admin");
            this.$store.commit("CHECK_ADMIN", true);
          }
          this.form.email = "";
          this.form.password = "";
          localStorage.setItem("token", data.token);
          this.$refs["modalku"].hide();
        })
        .catch(err => {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    },
    handleScroll(event) {
      if (window.scrollY > 530) {
        this.variant = "info";
        this.type = "dark";
        this.navbarChanged = true;
      } else if (window.scrollY < 530) {
        this.variant = "faded";
        this.type = "light";
        this.navbarChanged = false;
      }
    },
    signOut() {
      this.$store.commit("USER_LOGIN", false);
      this.$store.commit("CHECK_ADMIN", false);
      localStorage.clear();
      this.$router.push("/");
    },
    homePage() {
      this.$router.push("/");
      this.$store.commit("BACK_HOME");
    }
  },
  computed: {
    getProduct() {
      return this.$store.state.allProduct;
    },
    isAdmin() {
      return this.$store.state.admin;
    },
    checkLogin() {
      return this.$store.state.login;
    }
  },
  created() {
    if (localStorage.getItem("role") === "Admin") {
      this.$store.commit("CHECK_ADMIN", true);
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logoHome {
  transition: 0.8s ease-in-out;
}
</style>
