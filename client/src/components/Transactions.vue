<template>
  <v-app id="inspire">
    <v-content>
      <v-row v-if="this.transactions.length === 0" style="display:flex; flex-direction: column; text-align:center">
        <img src="../assets/empty_trans.png" alt="empty_trans" style="max-width:300px; margin:50px auto;">
        <h1 class="grey--text" style="margin-left:10px; margin-bottom:10px;">No Transaction Found</h1> 
      </v-row>
      <div v-else>
        <h1 class="grey--text" style="margin-left:10px; margin-bottom:10px;">TRANSACTIONS</h1> 
        <v-container class="fill-height" fluid style="display:flex; align-items:flex-start;">
          <v-row>
            <v-col>
              <v-card flat style="padding:20px;">
                <v-card-text>
                  <v-row v-for="(transaction, i) in transactions" :key="i" class="mb-4" style="display:flex; flex-direction:column;">
                    <v-row>
                      <v-col>
                        <strong style="font-size:18px; ">Transaction ID : {{ transaction._id }}</strong>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <strong style="font-size:18px;">Address : {{ transaction.address }}</strong>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col style="display:flex;">
                        <strong style="font-size:18px; margin-right:20px;">Product Names : </strong>
                        <div>
                          <v-row v-for="product in transaction.products" :key="product._id" >
                            <strong style="font-size:18px; margin-bottom:10px;">
                              {{ product.name }} = {{ product.qty }} pcs @ Rp. {{ formatPrice(product.price) }}
                            </strong>
                          </v-row>
                          <v-divider></v-divider>
                          <v-row style="margin-top:10px;">
                            <strong style="font-size:18px; margin-bottom:10px;">
                              Total Price = <strong style="color:black;"> Rp. {{ formatPrice(totalPrice[i]) }} </strong>
                            </strong>
                          </v-row>
                        </div>
                      </v-col>
                      <v-col class="col-3" style="display:flex; justify-content: flex-end; margin-right:20px;">
                        <div>
                          <v-row v-if="transaction.status === 'paid'">
                            <div style="display:flex; flex-direction:column; justify-content:flex-start;">
                              <strong style="font-size:18px; margin-right:20px;">Status : </strong>
                              <v-select v-model="status[i]" :items="['paid','done','cancel']" menu-props="auto" label="Status" hide-details prepend-icon="flag" single-line ></v-select>
                              <v-btn @click="confirmStatus(transaction._id, i)" dark color="green darken-3" style="margin-top:8px; margin-left:8px;">
                                <v-icon left>check</v-icon>
                                <span>Confirm</span>
                              </v-btn>
                            </div>
                          </v-row>
                          <v-row v-else-if="transaction.status === 'done'">
                            <strong style="font-size:18px; margin-right:20px;">Status : </strong>
                            <strong style="font-size:18px; margin-bottom:10px;">
                              Done
                            </strong>
                          </v-row>
                          <v-row v-else-if="transaction.status === 'cancel'">
                            <strong style="font-size:18px; margin-right:20px;">Status : </strong>
                            <strong style="font-size:18px; margin-bottom:10px;">
                              Cancelled
                            </strong>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </v-row>
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
    name: 'Transactions',
    data: () => ({
        transactions: [],
        status: [],
        totalPrice: [],
        snackbarSuccess: false,
        snackbarError: false,
        successMessage: "",
        errorMessage: "",
    }),
    methods: {
      getTransactions() {
        axios({
          method: 'GET',
          url: '/transactions',
          headers: {
            "jwt_token": this.$store.state.token
          }
        })
        .then((response) => {
          this.transactions = [];
          this.status = [];
          this.totalPrice = [];
          this.transactions = response.data;
          this.transactions.forEach((transaction) => {
            let total = 0;
            transaction.products.forEach((product) => {
              total += product.qty * product.price;
            });
            this.totalPrice.push(total);
            this.status.push(transaction.status);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      },
      confirmStatus(id, index) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Once confirm you cannot revert this status.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, confirm it!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'PATCH',
              url: '/transactions/'+id,
              data: {
                status: this.status[index]
              },
              headers: {
                "jwt_token": localStorage.getItem('token')
              }
            })
            .then((response) => {
              this.successMessage = response.data.message;
              this.snackbarSuccess = true;
              this.getTransactions();
              if (this.status[index] === 'cancel') {
                this.$store.commit('SET_USER_BALANCE', this.totalPrice[index]);
              }
            })
            .catch((err) => {
              this.errorMessage = err.response.data.message;
              this.snackbarError = true;
              console.log(err);
            });
          }
        })
      },
      // deleteProduct(id) {
      //   Swal.fire({
      //     title: 'Are you sure?',
      //     text: "You won't be able to revert this!",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, remove it!'
      //   })
      //   .then((result) => {
      //     if (result.value) {
      //       axios({
      //         method: 'DELETE',
      //         url: '/cart/'+id,
      //         headers: {
      //           "jwt_token": localStorage.getItem('token')
      //         }
      //       })
      //       .then((response) => {
      //         this.successMessage = 'Product removed successfully';
      //         this.snackbarSuccess = true;
      //         this.getTransactions();
      //       })
      //       .catch((err) => {
      //         this.errorMessage = err.response.data.message;
      //         this.snackbarError = true;
      //         console.log(err);
      //       });
      //     }
      //   })
      // },
      // checkout() {
      //   Swal.fire({
      //     title: 'Are you sure?',
      //     text: "Transaction will be created after this checkout.",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, proceed!'
      //   })
      //   .then((result) => {
      //     if (result.value) {
      //       axios({
      //         method: 'POST',
      //         url: '/cart/checkout',
      //         data: {
      //           address: this.address
      //         },
      //         headers: {
      //           "jwt_token": localStorage.getItem('token')
      //         }
      //       })
      //       .then((response) => {
      //         this.successMessage = response.data.message;
      //         this.snackbarSuccess = true;
      //         this.getTransactions();
      //       })
      //       .catch((err) => {
      //         this.errorMessage = err.response.data.message.join(", ");
      //         this.snackbarError = true;
      //         console.log(err);
      //       });
      //     }
      //   })
      // },
      // decrement(index) {
      //   if (this.qty[index] > 1)  this.qty[index]--;
      // },
      // increment(index) {
      //   this.qty[index]++;
      // },
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      formatStatus(value) {
        if (value) return 'Available'
        else return 'Not Available'
      },
      expandName(products) {
        let names = [];
        products.forEach((product) => {
          names.push(product.name);
        });
        console.log(products);
        console.log(names);
        return names.join("\n");
      }
    },
    created() {
      this.getTransactions();
    },
}
</script>
