<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-row v-if="this.products.length === 0" style="display:flex; flex-direction: column; text-align:center">
          <img src="../assets/empty_product.png" alt="empty_product" style="max-width:400px; margin:50px auto;">
          <h1 class="grey--text" style="margin-left:10px; margin-bottom:10px;">Please add new product first.</h1> 
        </v-row>
        <v-layout v-else row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="product in products" :key="product._id">
            <v-card class="text-xs-center ma-3" style="text-align:center;">
              <v-card-text style="text-align:right; margin-bottom:-10ppx">
                <i class="fas fa-times-circle" style="text-align:right; cursor:pointer" @click="deleteProduct(product._id)"></i>
              </v-card-text>
              <v-responsive>
                <v-avatar size="150" class="grey lighten-2">
                  <img :src="product.featured_image">
                </v-avatar>
              </v-responsive>
              <v-card-text style="text-align:left;">
                <div style="font-size:18px; font-weight:bold;">{{ product.name }}</div>
                <div class="grey--text">Price : Rp. {{ formatPrice(product.price) }}</div>
                <div class="grey--text">Stock : {{ product.stock }}</div>
                <div class="grey--text">Status : {{ formatStatus(product.status) }}</div>
              </v-card-text>
              <v-card-actions style="display:flex; justify-content:center">
                <v-btn router-link :to="`/product/${product._id}`" dark color="green darken-1" small>
                  <v-icon small left>edit</v-icon>
                  <span small>Edit</span>
                </v-btn>
                <v-btn dark color="green darken-1" small router-link :to="`/product/detail/${product._id}`">
                  <v-icon small left>assignment</v-icon>
                  <span small>Detail</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Snackbars -->
    <v-snackbar v-model="snackbarSuccess" :timeout="2000" bottom color="success">
      <span>{{ successMessage }}</span>
    </v-snackbar>
    <v-snackbar v-model="snackbarError" :timeout="2000" bottom color="error">
      <span>{{ errorMessage }}</span>
    </v-snackbar>

  </v-app>
</template>

<script>
import axios from '../apis/axios'
import Swal from 'sweetalert2'

export default {
    name: 'AllProducts',
    data: () => ({
        products: [],
        snackbarSuccess: false,
        snackbarError: false,
        successMessage: "",
        errorMessage: "",
    }),
    methods: {
      getProducts() {
        axios({
          method: 'GET',
          url: '/products/user',
          headers: {
            "jwt_token": localStorage.getItem('token')
          }
        })
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      deleteProduct(id) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, remove it!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'DELETE',
              url: '/products/'+id,
              headers: {
                "jwt_token": localStorage.getItem('token')
              }
            })
            .then((response) => {
              this.successMessage = 'Product deleted successfully';
              this.snackbarSuccess = true;
              this.getProducts();
            })
            .catch((err) => {
              this.errorMessage = err.response.data.message;
              this.snackbarError = true;
              console.log(err);
            });
          }
        })
      },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      formatStatus(value) {
        if (value) return 'Available'
        else return 'Not Available'
      },
    },
    created() {
      this.getProducts();
    },
}
</script>
