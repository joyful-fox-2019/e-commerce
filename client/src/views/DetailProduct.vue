<template>
    <div>
        <div class="wrapper">
            <div id="content">
            <DetailNavbar></DetailNavbar>
                <div class="container">
                  <div class="row mb-4">
                    <div class="col-4" style="border:1px solid #f0f0f2; box-shadow:1px 1px 1px gray;">
                      <img class="ribbon" src="../../public/ribbon3.png" alt="ribbon">
                      <p class="text-ribbon">Organic</p>
                      <img :src="detailProduct.image" alt="product" style="width:100%; height:100%; content-fit:center;">
                    </div>
                    <div class="col-8 pl-5 mt-3" style="text-align:left;">
                      <h1>{{detailProduct.name}}</h1>
                      <h3>Rp. {{detailProduct.price}}/ 1 pack</h3>
                      <p>
                        {{detailProduct.desc}}
                        <br>
                        <i class="fas fa-tags mr-2"></i>
                        <span v-for="(detail,index) in detailProduct.tags" :key="index">
                        <a class="mr-2" style="color:gray; cursor:pointer;">{{detail}}</a>
                      </span>
                      </p>
                      <br>
                      <button @click.prevent="addtoCart()" v-if="!isAdmin" class="btn btn-success" style="width:15%;">
                        <i class="fa fa-shopping-basket fa-fw mr-2"></i>
                        Beli
                      </button>
                      <a v-if="isAdmin" href="" class="btn btn-success mx-1" @click.prevent="updateProduct()">Update</a>
                      <a v-if="isAdmin" href="" class="btn btn-danger mx-1" @click.prevent="deleteProduct()">Delete</a>
                    </div>
                  </div>
                  <!-- suggesstion -->
                  <hr>
                  <div>
                      <div style="display:flex;">
                          <div class="ml-2 mt-3">
                              <p style="color:black;">Saran Produl Lainnya</p>
                          </div>
                      </div>
                      <!-- vege -->
                      <div v-if="randomNum === 1" class="mb-4" style="display:flex; flex-wrap:wrap; justify-content:center;">
                          <div v-for="vegetable in vegetables.slice(0, 4)" :key=vegetable._id class="card mx-2 my-2" style="width:23%;">
                              <img class="ribbon-product" src="../../public/ribbon3.png" alt="ribbon">
                              <p class="text-ribbon-product">Organic</p>
                              <img :src=vegetable.image class="card-img-top" alt="product" style="height:250px; object-fit: cover;">
                              <div class="card-body">
                                  <h5 class="card-title">{{ vegetable.name }}</h5>
                                  <p class="card-text">Rp. {{ vegetable.price }}/kg</p>
                                  <a href="" style="cursor:pointer;" class="btn btn-success form-control" @click.prevent="getdetail(vegetable._id)">Selengkapnya</a>
                              </div>
                          </div>
                      </div>
                      <!-- fruit -->
                      <div v-if="randomNum === 2" class="mb-4" style="display:flex; flex-wrap:wrap; justify-content:center;">
                          <div v-for="fruit in fruits.slice(0, 4)" :key=fruit._id class="card mx-2 my-2" style="width:23%;">
                              <img class="ribbon-product" src="../../public/ribbon3.png" alt="ribbon">
                              <p class="text-ribbon-product">Organic</p>
                              <img :src=fruit.image class="card-img-top" alt="product" style="height:250px; object-fit: cover;">
                              <div class="card-body">
                                  <h5 class="card-title">{{ fruit.name }}</h5>
                                  <p class="card-text">Rp. {{ fruit.price }}/kg</p>
                                  <a href="" style="cursor:pointer;" class="btn btn-success form-control" @click.prevent="getdetail(fruit._id)">Selengkapnya</a>
                              </div>
                          </div>
                      </div>
                      <!-- protein -->
                      <div v-if="randomNum === 3" class="mb-4" style="display:flex; flex-wrap:wrap; justify-content:center;">
                          <div v-for="protein in proteins.slice(0, 4)" :key=protein._id class="card mx-2 my-2" style="width:23%;">
                              <img class="ribbon-product" src="../../public/ribbon3.png" alt="ribbon">
                              <p class="text-ribbon-product">Organic</p>
                              <img :src=protein.image class="card-img-top" alt="product" style="height:250px; object-fit: cover;">
                              <div class="card-body">
                                  <h5 class="card-title">{{ protein.name }}</h5>
                                  <p class="card-text">Rp. {{ protein.price }}/kg</p>
                                  <a href="" style="cursor:pointer;" class="btn btn-success form-control" @click.prevent="getdetail(protein._id)">Selengkapnya</a>
                              </div>
                          </div>
                      </div>
                      <!-- grain -->
                      <div v-if="randomNum === 4" class="mb-4" style="display:flex; flex-wrap:wrap; justify-content:center;">
                          <div v-for="grain in grains.slice(0, 4)" :key=grain._id class="card mx-2 my-2" style="width:23%;">
                              <img class="ribbon-product" src="../../public/ribbon3.png" alt="ribbon">
                              <p class="text-ribbon-product">Organic</p>
                              <img :src=grain.image class="card-img-top" alt="product" style="height:250px; object-fit: cover;">
                              <div class="card-body">
                                  <h5 class="card-title">{{ grain.name }}</h5>
                                  <p class="card-text">Rp. {{ grain.price }}/kg</p>
                                  <a href="" style="cursor:pointer;" class="btn btn-success form-control" @click.prevent="getdetail(grain._id)">Selengkapnya</a>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
                <!-- <router-view/> -->
            </div>
        </div>
        <!-- foooter -->
        <div v-if="!isAdmin" class="footer">
                <div v-if="isCart" class="progress">
                    <div class="progress-bar progress-bar-success" style="width: 100%; background-color:#28a745;"></div>
                </div>
            <div class="row mt-2" style="align-items:center;">
                <div class="col-3" style="text-align:right; border-right: 1px solid gray;">
                    <!-- <div class="row"> -->
                        <div>
                            <div class="square">{{ carts.length }}</div>
                            <i class="fa fa-shopping-basket fa-lg" style="color:#429845; font-size:30px;"></i>
                        </div>
                    <!-- </div> -->
                </div>
                <div class="col-6" style="text-align:left;">
                    <h3 class="m-0" style="color:#f44e48;">Rp. {{ priceTotal }}</h3>
                    <span style="color:#f44e48; font-size:12px;">Free ongkir untuk pembelian diatas Rp.100.000</span>
                </div>
                <div class="col-3">
                    <button @click.prevent="checkoutProduct()" class="btn btn-success">Lanjut</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DetailNavbar from '@/components/DetailNavbar.vue'
import { mapState, mapActions } from 'vuex'
import axios from '../apis/server'
import Swal from 'sweetalert2'

export default {
  name: 'DetailProduct',
  data () {
    return {
      randomNum: 0,
      isAdmin: false
    }
  },
  components: {
    DetailNavbar
  },
  methods: {
    ...mapActions([
      'getGrains', 'getFruits', 'getVegetables', 'getProteins', 'getDetailProduct', 'getCart', 'addCart', 'checkout', 'getUserTrans'
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
        Swal.fire('errorr', 'Login terlebih dahulu untuk melakukan transaksi', 'error')
        this.$router.push('/user/login')
      }
    },
    getdetail (id) {
      this.getDetailProduct(id)
    },
    updateProduct () {
      this.$router.push(`/update/${this.$route.params.id}`)
    },
    deleteProduct () {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `products/${this.$route.params.id}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(_ => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your article has been deleted.',
                'success'
              )
              this.$router.push('/admin')
            })
            .catch(err => {
              console.log(err)

              swalWithBootstrapButtons.fire(
                'Error',
                'internal server error',
                'error'
              )
            })
        } else if (
        /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your article is safe',
            'error'
          )
        }
      })
    },
    setCartAnim (param) {
      // this.IS_CART(param)
      this.$store.commit('IS_CART', param)
    },
    addtoCart () {
      this.setCartAnim(true)
      if (localStorage.getItem('token')) {
        this.addCart(this.$route.params.id)
          .then(_ => {
            // Swal.fire('success','successsss','success')
            this.getCart()
            this.setCartAnim(false)
          })
          .catch(err => {
            Swal.fire('errorr', 'errorrsss', 'error')
          })
      } else {
        this.setCartAnim(false)
        this.$router.push('/user/login')
      }
    }
  },
  computed: {
    ...mapState([
      'grains', 'detailProduct', 'fruits', 'vegetables', 'proteins', 'carts', 'isCart'
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
    this.getCart()
    this.randomNum = Math.floor(Math.random() * 4 + 1)
    // console.log(randomNum,'----------------');
    if (this.randomNum === 1) {
      this.getGrains()
    } else if (this.randomNum === 2) {
      this.getFruits()
    } else if (this.randomNum === 3) {
      this.getVegetables()
    } else if (this.randomNum === 4) {
      this.getProteins()
    }
    if (localStorage.getItem('setting') === 'true') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
  }
}
</script>

<style scoped>
a:hover {
  color: green !important;
  text-decoration: none;
}
.ribbon {
    position: absolute;
    width: 27%;
    height: 27;
    top: -3%;
    left: 76%;
}
.text-ribbon {
    position: absolute;
    top: -3%;
    left: 91%;
    transform-origin: 0 0;
    transform: rotate(46deg);
    color: white;
}
/* ------ */
.ribbon-product {
    position: absolute;
    width: 40%;
    height: 40;
    top: -2%;
    left: 64%;
}
.text-ribbon-product {
    position: absolute;
    top: -2%;
    left: 85%;
    transform-origin: 0 0;
    transform: rotate(46deg);
    color: white;
}
</style>
