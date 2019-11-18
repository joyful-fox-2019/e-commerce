<template>
  <div>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div id="dismiss">
                <i class="fas fa-arrow-left"></i>
            </div>
            <ul class="list-unstyled components">
              <li>
                <div class="sidebar-header">
                  <h1 id="logo">FreshMeal</h1>
                </div>
              </li>
              <li>
                <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
              </li>
              <li v-if="role === 'customer'">
                <router-link to="/cart"><i class="fas fa-shopping-cart"></i> My Cart</router-link>
              </li>
              <li v-if="role === 'admin'">
                <router-link to="/create"><i class="fas fa-plus"></i> Create Product</router-link>
              </li>
              <li>
                <router-link to="/history"><i class="fas fa-history"></i> Transaction</router-link>
              </li>
              <!-- <li>
                  <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                  <ul class="collapse list-unstyled" id="pageSubmenu">
                      <li>
                          <a href="#">Page 1</a>
                      </li>
                      <li>
                          <a href="#">Page 2</a>
                      </li>
                      <li>
                          <a href="#">Page 3</a>
                      </li>
                  </ul>
              </li> -->
              <br />
              <br />
              <br />
            </ul>
            <ul class="list-unstyled CTAs">
                <li class="logout" v-if="!isLogin">
                  <router-link to="/login"><h6>Login / register</h6></router-link>
                </li>
                <li class="logout" v-if="isLogin">
                  <a @click="logout"><h6>Logout</h6></a>
                </li>
            </ul>
        </nav>

    </div>

    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    role () {
      return this.$store.state.role
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

#sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: -250px;
    height: 100vh;
    z-index: 999;
    background: rgb(21, 172, 114);
    color: #fff;
    transition: all 0.3s;
    overflow-y: scroll;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

#sidebar.active {
    left: 0;
}

#dismiss {
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: rgb(21, 172, 114);
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}

#dismiss:hover {
    background: #fff;
    color: rgb(21, 172, 114);
}

.overlay {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
.overlay.active {
    display: block;
    opacity: 1;
}

#sidebar .sidebar-header {
    margin-top: 25px;
    padding: 20px;
    background: rgb(21, 172, 114);
    border: 2px solid white;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: rgb(21, 172, 114);
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: rgb(21, 172, 114);
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: rgb(21, 172, 114);
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
    border: 1px solid white;
    border-radius: 20px;
}

a.download {
    background: #fff;
    color: rgb(21, 172, 114);
}

a.article,
a.article:hover {
    background: rgb(21, 172, 114) !important;
    color: #fff !important;
}

</style>
