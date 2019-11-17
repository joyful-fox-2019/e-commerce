<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid style="display:flex; align-items:flex-start;">
        <v-row>
          <v-col>
            <v-card flat>
              <v-card-text>
                <v-row class="mb-4">
                  <!-- <v-avatar color="grey" size="200" class="mr-4"> -->
                    <img :src="product.featured_image" style="max-width:300px; margin-left:10px;">
                  <!-- </v-avatar> -->
                  <v-col>
                    <strong style="font-size:40px; margin-top:50px;">{{ product.name }}</strong><br/><br/>
                    <p style="font-size:24px;">Price : Rp. {{ formatPrice(product.price) }}</p><br/>
                    <p style="font-size:20px;">Status : {{ formatStatus(product.status) }}</p>
                    <p style="font-size:20px;">Stock : {{ product.stock }}</p><br/>

                    <div style="display:flex; align-items:flex-start;">
                      <i @click="decrement" class="fas fa-minus-circle fa-3x" style="color:green; cursor:pointer; margin-top:6px; margin-right:6px;"></i>
                      <v-text-field label="Qty" v-model="qty" :rules="qtyRules" outlined type="number" style="max-width: 70px;" />
                      <i @click="increment" class="fas fa-plus-circle fa-3x" style="color:green; cursor:pointer; margin-top:6px; margin-left:6px;"></i>
                      <v-btn @click="addCart(product._id, product.status, product.UserId._id)" dark color="green darken-3" style="margin-top:8px; margin-left:8px;">
                        <v-icon left>add_shopping_cart</v-icon>
                        <span>Add to Cart</span>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col style="text-align:right; max-width:200px;">
                    <strong style="font-size:18px; margin-top:50px;">Seller Name : </strong><br/>
                    <p style="font-size:18px;">{{ product.UserId.name }}</p>
                  </v-col>
                </v-row>
                <strong style="font-size:24px; margin-top:50px;">Description : </strong><br/><br/>
                <p>
                  {{ product.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
    name: 'DetailProduct',
    data: () => ({
        product: {},
        qty: 1,
        qtyRules: [
            v => !!v || 'Qty is required',
        ],
        snackbarSuccess: false,
        snackbarError: false,
        successMessage: "",
        errorMessage: "",
    }),
    methods: {
      getProduct() {
        axios({
          method: 'GET',
          url: '/products/'+this.$route.params.id,
          headers: {
            "jwt_token": this.$store.state.token
          }
        })
        .then((response) => {
          this.product = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      addCart(id, status, seller) {
        Swal.fire({
          title: 'Are you sure?',
          text: "This product is going to be added to your cart.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, add it!'
        })
        .then((result) => {
          if (result.value) {
            if (!status) {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'This product is unavailable',
                showConfirmButton: false,
                timer: 1500
              });
            } 
            else if (seller === this.$store.state.user._id) {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You cannot buy your own product',
                showConfirmButton: false,
                timer: 1500
              });
            } 
            else {
              axios({
                method: 'POST',
                url: '/cart',
                data: {
                  ProductId: id,
                  qty: this.qty
                },
                headers: {
                  "jwt_token": localStorage.getItem('token')
                }
              })
              .then((response) => {
                this.successMessage = response.data.message;
                this.snackbarSuccess = true;
                // this.$store.emit('SET_PRODUCTS', response.data);
              })
              .catch((err) => {
                this.errorMessage = err.response.data.message;
                this.snackbarError = true;
                console.log(err);
              });
            }
          }
        })
      },
      decrement() {
        if (this.qty > 1)  this.qty--;
      },
      increment() {
        this.qty++;
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
      this.getProduct();
    },
}
</script>
