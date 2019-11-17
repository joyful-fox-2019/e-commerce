<template>
<div>
    <nav class="sidebar">
        <div class="dismiss">
            <i class="fas fa-chevron-left"></i>
        </div>

        <div class="sidebar-header">
            <img src="../../public/logo.png" alt="logo" style="width:150px;">
        </div>

        <ul class="list-unstyled components">
            <img src="../../public/logo-text2.png" alt="logo" style="width:180px;">
            <li class="active">
                <router-link to="/admin">Home</router-link>
            </li>
            <li>
                <router-link to="/admin/addproduct" class="addproduct" style="background-color: #66b851; color:white;">Add Product</router-link>
            </li>
            <li>
                <router-link to="/admin/transaction" class="trans">Transaction History</router-link>
            </li>
        </ul>

        <ul class="list-unstyled CTAs">
            <li>
                <a @click.prevent="logout()" class="register" style="color:black; cursor:pointer;">Logout</a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Sidebar',
  methods: {
    logout () {
      let gapi
      if (gapi === undefined) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })
        this.$store.commit('setLogout')
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('setting')
        this.$router.push('/')
        Toast.fire({
          icon: 'success',
          title: 'See you again'
        })
      } else {
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
          this.$store.commit('setLogout')
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          localStorage.removeItem('email')
          localStorage.removeItem('setting')
          this.$router.push('/')
          Toast.fire({
            icon: 'success',
            title: 'See you again'
          })
        })
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  mounted () {
    //   $(document).ready(function () {
    $('.sidebar').mCustomScrollbar({
      theme: 'minimal'
    })

    $('.dismiss, .overlay').on('click', function () {
      $('.sidebar').removeClass('active')
      $('.overlay').fadeOut()
    })

    $('.sidebarCollapse').on('click', function () {
      $('.sidebar').addClass('active')
      $('.overlay').fadeIn()
      $('.collapse.in').toggleClass('in')
      $('a[aria-expanded=true]').attr('aria-expanded', 'false')
    })
    //  });
  }
}
</script>

<style scoped>
.addproduct:hover {
    background-color: white !important;
    color: black;
}

a {
    color: white;
    text-decoration: none;
}
a:hover {
    color: black !important;
    text-decoration: none;
}
/* ------- */
.sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: -250px;
    height: 100vh;
    z-index: 1021 !important;
    background: linear-gradient(#4caf50, #8ac554);
    color: #fff;
    transition: all 0.3s;
    overflow-y: scroll;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.sidebar.active {
    left: 0;
}

.dismiss {
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #4caf50;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}
.dismiss:hover {
    background: #fff;
    color: #4caf50;
}

.overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    display: none;
}

.sidebar .sidebar-header {
    padding: 20px;
    background: #4caf50;
}

.sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #4caf50;
}

.sidebar ul p {
    color: #fff;
    padding: 10px;
}

.sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
.sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

</style>
