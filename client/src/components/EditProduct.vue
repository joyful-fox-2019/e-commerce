<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="12">
            <h1 class="grey--text" style="margin-top:-30px; margin-bottom:30px;">EDIT PRODUCT</h1>
            <v-form @submit.prevent="editProduct(product._id)" ref="editForm" enctype="multipart/form-data" >
              <v-text-field label="Name" v-model="name" :rules="nameRules" prepend-icon="label" type="text" />
              <v-textarea label="Description" v-model="description" :rules="descriptionRules" prepend-icon="assignment"></v-textarea>
              <v-text-field label="Price" v-model="price" :rules="priceRules"  prepend-icon="attach_money" type="number" />
              <v-text-field label="Stock" v-model="stock" :rules="stockRules"  prepend-icon="move_to_inbox" type="number" />
              <v-file-input
                v-model="featured_image"
                placeholder="Upload your featured image"
                label="Featured Image"
                multiple
                prepend-icon="photo"
              >
              <template v-slot:selection="{ text }">
                <v-chip small label color="green" dark>
                  {{ text }}
                </v-chip>
              </template>
              </v-file-input>
              <v-switch label="Status" v-model="status" color="green" prepend-icon="flag" />
              
              <v-card-actions>
                <v-btn dark class="ma-3" color="green darken-1" type="submit">
                    <i class="fas fa-edit mr-2"></i>
                    Edit
                </v-btn>
                <v-btn dark class="ma-3" color="green darken-1" router-link to="/products/user">
                    Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
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
    name: 'EditProduct',
    data: () => ({
        product: {},
        name: '',
        description: '',
        price: '',
        stock: '',
        featured_image: [],
        status: false,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length >= 3) || 'Name must be at least 3 characters',
        ],
        descriptionRules: [
            v => !!v || 'Description is required',
            v => (v && v.length >= 3) || 'Description must be at least 3 characters',
        ],
        priceRules: [
            v => !!v || 'Price is required',
        ],
        stockRules: [
            v => !!v || 'Stock is required',
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
          this.name = response.data.name;
          this.description = response.data.description;
          this.price = response.data.price;
          this.stock = response.data.stock;
          this.status = response.data.status;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      editProduct(id) {
        if (this.$refs.editForm.validate()) {
          let formData = new FormData();
          formData.append("name", this.name);
          formData.append("description", this.description);
          formData.append("price", this.price);
          formData.append("stock", this.stock);
          if (this.featured_image.length > 0) {
              formData.append("featured_image", this.featured_image[0]);
          }
          formData.append("status", this.status);
          
          axios({
            method: 'PUT',
            url: '/products/'+this.$route.params.id,
            data: formData,
            headers: {
              "jwt_token": this.$store.state.token
            }
          })
          .then((response) => {
            this.$store.commit('SET_SNACKBAR_HOME', true);
            this.$store.commit('SET_SNACKBAR_HOME_MESSAGE', 'Edit product successfully');
            this.$router.push('/products/user');
          })
          .catch((err) => {
            if(err.response.data) {
                this.errorMessage = err.response.data.message.join(", ");
                this.snackbarError = true;
            } 
            else {
                console.log(err);
            }
          });
        }
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
