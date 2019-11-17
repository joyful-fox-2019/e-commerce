<template>
  <div style="background-color: transparent; height:10vh; z-index:100;" class="row">
    <div class="container my-3">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div class="container">
          <router-link class="navbar-brand js-scroll-trigger navtitle active" to="/">minima.</router-link>
          <form @submit.prevent="pushSearch" style="width: 200px !important; margin:10px;">
            <div class="input-group">
              <i
                class="fas fa-search"
                style="color: rgb(40,40,40); 
                  font-size:15px; 
                  display: flex; 
                  justify-content: baseline; 
                  align-items: center;"
              ></i>
              <input
                type="text"
                v-model="searchInput"
                class="form-control p-2"
                placeholder="Enter to search.."
                aria-label="Search.."
                aria-describedby="basic-addon1"
                style="border: none; background-color: transparent;"
              />
            </div>
          </form>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style="border: none;"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a
                  data-toggle="modal"
                  data-target="#loginmodal"
                  class="nav-link sub active"
                  to="/login"
                >Sign in</a>
              </li>
              <li class="nav-item"></li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/products">
                  <i class="fas fa-shopping-bag" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <!-- Shop -->
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/cart">
                  <i class="fas fa-shopping-cart" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <!-- Cart -->
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link sub active" to="/admin">
                  <i class="fas fa-user" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <!-- User -->
                </router-link>
              </li>
              <li class="nav-item">
                <router-link v-if="isAdmin" class="nav-link sub active" to="/admin">Admin</router-link>
              </li>
              <li @click="signOut" class="nav-item">
                <router-link class="nav-link sub active" to="/">
                  <i class="fas fa-sign-out-alt" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <!-- Sign out -->
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul style="display:flex;" class="nav justify-content-between"></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLogin: false,
      isAdmin: "",
      searchInput: ""
    };
  },
  computed() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    }
    if (localStorage.getItem("isAdmin")) {
      this.isLogin = true;
    }
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.isLogin = false;
      this.isAdmin = "";
      this.swal.fire("Logged out", "Have a nice day", "success");
      this.$router.push("/");
    },
    pushSearch() {
      this.axios
        .get(`/products`, {
          params: { name: this.searchInput, category: this.searchInput }
        })
        .then(({ data }) => {
          this.searchResult = data;
          this.$router.push("/search");
          this.searchInput = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
}
.sub {
  color: rgb(48, 48, 48);
  font-size: 14px;
}
.navtitle {
  font-size: 30px;
  font-weight: 700;
}
</style>