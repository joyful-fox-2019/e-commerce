<template>
  <div>
    <b-container>
      <b-row class="mt-3" v-if="products.length>0">
        <b-col col lg="3">
          <div class="list-group mt-2">
            <a
              href
              @click.prevent="category = n"
              class="list-group-item"
              v-for="(n, index) in page"
              :key="index"
            >Category {{n}}</a>
          </div>
        </b-col>
        <b-col col lg="9">
          <div class="row mt-3">
            <div class="col-lg-4 col-md-6 mb-4" v-for="product in productsList" :key="product._id">
              <div class="card h-100">
                <a>
                  <img class="card-img-top" :src="product.image" alt width="250px" height="250px" />
                </a>
                <div class="card-body">
                  <h4 class="card-title">{{product.name}}</h4>
                  <h5>{{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}}</h5>
                  <p class="card-text">Stock: {{product.stock}}</p>
                </div>
                <div
                  v-if="$store.state.isAdmin"
                  v-b-modal.edit
                  @click.prevent="getProduct(product._id)"
                  type="button"
                  class="btn btn-warning"
                >
                  <i class="far fa-keyboard"></i>&nbsp; Edit
                </div>
                <div
                  v-if="$store.state.isAdmin"
                  @click="deleteProduct(product._id)"
                  type="button"
                  class="btn btn-danger"
                >
                  <i class="fas fa-ban"></i>&nbsp; Delete
                </div>
                <div
                  type="button"
                  v-if="!$store.state.isAdmin"
                  @click.prevent="addToCart(product._id)"
                  class="card-footer text-right"
                >
                  <i class="fab fa-opencart"></i>&nbsp; Add to Cart
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <!-- Modal -->
    <b-modal
      id="edit"
      title="Edit Product"
      cancel-title="Cancel"
      cancel-variant="outline-secondary"
      ok-title="Edit"
      ok-variant="outline-dark"
      @ok="editProduct"
    >
      <b-form-group label="Product's Name">
        <b-form-textarea v-model="name" required placeholder="Enter Product's Name"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Product's Stock">
        <b-form-input type="text" v-model="stock" required placeholder="Enter Product's Stock"></b-form-input>
      </b-form-group>

      <b-form-group label="Product's Price">
        <b-form-input type="text" v-model="price" required placeholder="Enter Product's Price"></b-form-input>
      </b-form-group>

      <b-form-group label="Product's Image"></b-form-group>
      <img :src="image" alt width="200" />
      <input @change="uploadImage" type="file" class="custom-file-input" accept="image/*" />
      <b-button style="margin-top: -3rem;">Upload</b-button>
    </b-modal>
    <!-- Modal -->
  </div>
</template>

<script>
import server from '../api/server'
import Swal from 'sweetalert2'

export default {
  props: {
    products: Array
  },
  data () {
    return {
      category: 1,
      id: '',
      name: '',
      image: '',
      price: '',
      stock: '',
      img: ''
    }
  },
  methods: {
    addToCart (productId) {
      if (this.$store.state.isLogin) {
        let payload = {
          productId
        }
        this.$store.dispatch('addToCart', payload).then(response => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cart Added',
            showConfirmButton: false,
            timer: 800
          })
        })
      } else {
        Swal.fire({
          type: '',
          title: 'Redirect',
          text: `Please Login First`
        })
        this.$router.push('/auth/login')
      }
    },
    getProduct (productId) {
      server({
        method: 'get',
        url: `/products/${productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.id = data._id
          this.name = data.name
          this.image = data.image
          this.price = data.price
          this.stock = data.stock
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    uploadImage (event) {
      this.img = event.target.files[0]
      let bodyFormData = new FormData()
      if (this.img) {
        Swal.fire({
          title: 'wait a minute to upload data',
          allowOutsideClick: () => !Swal.isLoading()
        })
        Swal.showLoading('Please Wait..')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Image Selected'
        })
      }
      bodyFormData.append('image', this.img)
      server({
        method: 'post',
        url: 'upload',
        data: bodyFormData,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.image = data.link
          Swal.close()
          Swal.fire({
            icon: 'success',
            title: 'Image Uploaded'
          })
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    editProduct () {
      server({
        method: 'put',
        url: `/products/${this.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image: this.image
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getProducts')
          this.name = ''
          this.price = ''
          this.stock = ''
          this.img = ''
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    deleteProduct (productId) {
      Swal.fire({
        title: 'Delete',
        text: 'Do you want to delete this product?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes'
      }).then(result => {
        if (result.value) {
          server({
            method: 'delete',
            url: `/products/${productId}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(({ data }) => {
              this.$store.dispatch('getProducts')
              this.name = ''
              this.price = ''
              this.stock = ''
              this.img = ''
            })
            .catch(err => {
              console.log(err.response.data.message)
            })
        }
      })
    }
  },
  computed: {
    page () {
      return Math.ceil(this.products.length / 6)
    },
    productsList () {
      let start = (this.category - 1) * 6
      let displayProducts = []
      let end = this.products.length
      if (end - start < 6) {
        for (let i = start; i < end; i++) {
          displayProducts.push(this.products[i])
        }
      } else {
        for (let i = start; i < start + 6; i++) {
          displayProducts.push(this.products[i])
        }
      }
      return displayProducts
    }
  }
}
</script>

<style scoped>
a {
  color: black !important;
}
</style>
