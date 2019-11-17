<template>
    <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <div class="wrapper">

            <Sidebar></Sidebar>
            <div id="content">
            <Navbar class="sticky-top"></Navbar>
            <Carousel></Carousel>
            <BannerInfo></BannerInfo>
            <Category></Category>
            <Product></Product>
            </div>
        </div>
        <div class="footer">
                <div v-if="isCart" class="progress">
                    <div class="progress-bar progress-bar-success" style="width: 100%; background-color:#28a745;"></div>
                </div>
            <div class="row mt-2" style="align-items:center;">
                <div class="col-3" style="text-align:right; border-right: 1px solid gray;">
                    <!-- <div class="row"> -->
                        <div>
                            <div class="square">{{carts.length}}</div>
                            <i class="fa fa-shopping-basket fa-lg" style="color:#429845; font-size:30px;"></i>
                        </div>
                    <!-- </div> -->
                </div>
                <div class="col-6" style="text-align:left;">
                    <h3 class="m-0" style="color:#f44e48;">Rp. {{ priceTotal }}</h3>
                    <span style="color:#f44e48; font-size:12px;">Free ongkir untuk pembelian diatas Rp.100.000</span>
                </div>
                <div class="col-3">
                    <button @click.prevent="checkoutProduct()" class="btn btn-success">
                        Lanjut
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Carousel from '@/components/Carousel'
import BannerInfo from '@/components/BannerInfo'
import Category from '@/components/Category'
import Product from '@/components/Product'
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    Navbar, Sidebar, Carousel, BannerInfo, Category, Product
  },
  methods: {
    ...mapActions([
      'getFruits', 'getVegetables', 'getProteins', 'getGrains', 'getCart', 'checkout', 'getUserTrans'
    ]),
    checkoutProduct () {
      if (localStorage.getItem('token')) {
        this.checkout()
          .then(data => {
            console.log(data)
            this.getUserTrans()
            Swal.fire('success', 'transaksi berhasil', 'success')
          })
      } else {
        this.$router.push('/user/login')
      }
    }
  },
  computed: {
    ...mapState([
      'carts', 'isCart'
    ]),
    priceTotal () {
      let total = 0
      for (let i = 0; i < this.carts.length; i++) {
        total += (this.carts[i].qty * this.carts[i].productId.price)
      }
      return total
    }
  },
  created () {
    this.getVegetables()
    this.getFruits()
    this.getProteins()
    this.getGrains()
    this.getCart()
    if (localStorage.getItem('token')) {
      this.$store.commit('setLogin')
    }
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

<style>
.progress .progress-bar {
    animation-name: animateBar;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 1s;
}
@keyframes animateBar {
    0% {transform: translateX(-100%);}
    100% {transform: translateX(0);}
}
.footer {
    position: fixed;
    bottom:0;
    width:100vw;
    height:80px;   /* Height of the footer */
    background:#fff;
    box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 5;
}
.square {
    position: relative;
    left: 92%;
    top: 12%;
    width: 20px;
    height: 20px;
    background-color:
    #f44336;
    border-radius: 50%;
    font-size: 10px;
    color:#fff;
    text-align: center;
    line-height: 20px;
    /* margin-bottom: auto; */
    /* margin-top: auto; */
    /* z-index: 1; */
}
/*
    DEMO STYLE
*/
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
    /* height: 100%; */
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
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

#dismiss {
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
#dismiss:hover {
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

a[data-toggle="collapse"] {
    position: relative;
}

a[aria-expanded="false"]::before, a[aria-expanded="true"]::before {
    content: '\e259';
    display: block;
    position: absolute;
    right: 20px;
    font-family: 'Glyphicons Halflings';
    font-size: 0.6em;
}
a[aria-expanded="true"]::before {
    content: '\e260';
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #4caf50;
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
}
a.register {
    background: #fff;
    color: #4caf50;
}
a.login, a.login:hover {
    background: #4caf50 !important;
    color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */
#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    right: 0;
}

</style>
