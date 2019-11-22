<template>
  <div>
      <div>
          <button class="btn btn-primary" data-toggle="modal" data-target="#addProduct">Add Product</button>
      </div>
        <!-- Modal -->
      <div>
        <div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <input v-model="product" type="text" class="form-control" id="productName" aria-describedby="emailHelp" placeholder="Product Name">
                    </div>
                    <div class="form-group">
                        <input v-model="description" type="text" class="form-control" id="productDesc" placeholder="Description">
                    </div>
                    <div class="form-group">
                        <input v-model="quantity" type="number" class="form-control" id="productQuantity" placeholder="Quantitiy">
                    </div>
                    <div class="form-group">
                        <input v-model="price" type="number" class="form-control" id="price" placeholder="Price">
                    </div>
                    <div class="form-group">
                        <input v-on:change="fileUploadHandler" type="file" ref="file" class="form-control" id="image">
                    </div>
                    <button v-on:click.prevent="createProduct" type="submit" class="btn btn-primary" data-dismiss="modal">Submit</button>
                 </form>
            </div>
            </div>
        </div>
        </div>
      </div>
      <div class="container">
        <div class="d-flex justify-content-center" style="background-color: whitesmoke;">
            <h1>List Product</h1>
        </div>
        <div class="d-flex mt-3">
            <div class="card" v-for="(product,index) in products" :key="index">
                <img :src="product.imageUrl" class="card-img-top content" alt="card">
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="card-title">{{ product.productName }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                  </div>
                  <div>
                    <p class="card-text">Stock: {{ product.quantity }} pcs</p>
                    <p class="card-text">Price: Rp.{{ product.price }}</p>
                    <button class="btn btn-danger mr-2" v-on:click.prevent="deleteProduct(product._id)">Delete</button>
                    <button class="btn btn-primary" v-on:click.prevent="editProduct(product._id)" >Edit</button>
                  </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

import Swal from 'sweetalert2'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      product: '',
      description: '',
      quantity: null,
      price: null,
      url: '',
      listProducts: []
    }
  },
  methods: {
    fileUploadHandler () {
      Swal.showLoading({
        text: 'Loading'
      })
      const data = new FormData()
      const image = this.$refs.file.files[0]
      data.append('image', image)
      let payload = {
        token: localStorage.getItem('token'),
        data
      }
      this.$store.dispatch('uploadGCS', payload)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Upload Image',
            text: 'Upload image success !'
          })
          this.url = response.data.location
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Upload image failed!'
          })
        })
    },
    createProduct () {
      let productData = {
        name: this.product,
        desc: this.description,
        quantity: this.quantity,
        price: this.price,
        url: this.url
      }
      this.$store.dispatch('createProduct', { productData, token: localStorage.getItem('token') })
      this.product = ''
      this.description = ''
      this.quantity = ''
      this.price = ''
      this.url = ''
    },
    getAllProduct () {
      this.$store.dispatch('fetchingProduct')
    },
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteProduct', { token: localStorage.getItem('token'), id })
        }
      })
    },
    editProduct (id) {
      let token = localStorage.getItem('token')
      this.$store.dispatch('getOneProduct', { id, token })
        .then(({ data }) => {
          this.$store.commit('SET_CURRENT_PRODUCT', data)
          this.$router.push('edit-product')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchingProduct')
  },
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style scoped>
.card{
    margin: 0px 5px;
    width: 18rem;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}

.card:hover{
    box-shadow: 0 4px 8px 0 rgba(169, 138, 240, 0.514), 0 6px 20px 0 rgba(169, 138, 240, 0.514);
}

.content{
    height: 18rem;
    width: 100%;
}
</style>
