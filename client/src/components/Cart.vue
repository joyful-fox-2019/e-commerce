<template>
  <v-app id="inspire">
    <v-content>
      <v-row v-if="this.products.length === 0" style="display:flex; flex-direction: column; text-align:center">
        <img src="../assets/empty_cart.png" alt="empty_cart" style="max-width:400px; margin:50px auto;">
        <h1 class="grey--text" style="margin-left:10px; margin-bottom:10px;">Your Shopping Cart is Empty</h1> 
      </v-row>
      <div v-else>
        <h1 class="grey--text" style="margin-left:10px; margin-bottom:10px;">SHOPPING CART</h1> 
        <v-container class="fill-height" fluid style="display:flex; align-items:flex-start;">
          <v-row>
            <v-col>
              <v-card flat style="padding:20px;">
                <v-card-text>
                  <v-row v-for="(product, i) in products" :key="i" class="mb-4" style="display:flex; flex-direction:column;">
                    <v-row>
                      <v-col>
                        <strong style="font-size:18px; ">Seller Name : {{ product.ProductId.UserId.name }}</strong>
                      </v-col>
                    </v-row>
                    <v-row>
                      <!-- <v-avatar color="grey" size="200" class="mr-4"> -->
                        <img :src="product.ProductId.featured_image" style="max-width:300px; margin-left:10px;">
                      <!-- </v-avatar> -->
                      <v-col>
                        <strong style="font-size:40px; margin-top:50px;">{{ product.ProductId.name }}</strong><br/><br/>
                        <p style="font-size:24px;">Price : Rp. {{ formatPrice(product.ProductId.price) }}</p><br/><br/>
                        <div style="display:flex; align-items:flex-start;">
                          <!-- <i @click="decrement(i)" class="fas fa-minus-circle fa-3x" style="color:green; cursor:pointer; margin-top:6px; margin-right:6px;"></i> -->
                          <v-text-field label="Qty" v-model="qty[i]" :rules="qtyRules" outlined type="number" style="max-width: 70px;" />
                          <!-- <i @click="increment(i)" class="fas fa-plus-circle fa-3x" style="color:green; cursor:pointer; margin-top:6px; margin-left:6px;"></i> -->
                          <v-btn @click="editCart(product.ProductId._id, qty[i])" dark color="green darken-3" style="margin-top:8px; margin-left:8px;">
                            <v-icon left>add_shopping_cart</v-icon>
                            <span>Update Cart</span>
                          </v-btn>
                          <v-btn @click="deleteProduct(product.ProductId._id)" dark color="pink darken-3" style="margin-top:8px; margin-left:8px;">
                            <v-icon left>remove_shopping_cart</v-icon>
                            <span>Remove</span>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-row>
                  <div style="display:flex; justify-content:space-between">
                    <div>
                      <h1 class="grey--text" style="font-size:28px; margin-left:10px; margin-top:10px;">
                        TOTAL PRICE : <strong style="color:black;"> Rp. {{ formatPrice(totalCart) }} </strong>
                      </h1> 
                      <v-textarea label="Address" v-model="address" name="address" :rules="addressRules" prepend-icon="store"></v-textarea>
                    </div>
                    <div>
                      <v-btn @click="checkout()" dark color="green darken-3" style="margin-top:8px; margin-left:8px;">
                        <v-icon left>payment</v-icon>
                        <span>Checkout</span>
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
    name: 'Cart',
    data: () => ({
        products: [],
        qty: [],
        qtyRules: [
            v => !!v || 'Qty is required',
        ],
        address: '',
        addressRules: [
            v => !!v || 'Address is required',
            v => (v && v.length >= 3) || 'Address must be at least 3 characters',
        ],
        totalCart: 0,
        snackbarSuccess: false,
        snackbarError: false,
        successMessage: "",
        errorMessage: "",
    }),
    methods: {
      getProducts() {
        axios({
          method: 'GET',
          url: '/cart',
          headers: {
            "jwt_token": this.$store.state.token
          }
        })
        .then((response) => {
          this.products = [];
          this.qty = [];
          this.totalCart = 0;
          this.products = response.data;
          this.products.forEach((product) => {
            this.qty.push(product.qty);
            this.totalCart += product.qty * product.ProductId.price;
          });
        })
        .catch((err) => {
          console.log(err);
        });
      },
      editCart(id, qty) {
        Swal.fire({
          title: 'Are you sure?',
          text: "This product qty is going to be updated.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'PUT',
              url: '/cart/'+id,
              data: {
                qty: qty
              },
              headers: {
                "jwt_token": localStorage.getItem('token')
              }
            })
            .then((response) => {
              this.successMessage = response.data.message;
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
              url: '/cart/'+id,
              headers: {
                "jwt_token": localStorage.getItem('token')
              }
            })
            .then((response) => {
              this.successMessage = 'Product removed successfully';
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
      checkout() {
        Swal.fire({
          title: 'Are you sure?',
          text: "Transaction will be created after this checkout.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'POST',
              url: '/cart/checkout',
              data: {
                address: this.address
              },
              headers: {
                "jwt_token": localStorage.getItem('token')
              }
            })
            .then((response) => {
              this.successMessage = response.data.message;
              this.snackbarSuccess = true;
              this.getProducts();
            })
            .catch((err) => {
              this.errorMessage = err.response.data.message.join(", ");
              this.snackbarError = true;
              console.log(err);
            });
          }
        })
      },
      decrement(index) {
        if (this.qty[index] > 1)  this.qty[index]--;
      },
      increment(index) {
        this.qty[index]++;
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
