<template>
  <v-app id="inspire">
    <!-- Navigation Bar -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="green darken-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <a router-link to="/" class="hidden-sm-and-down" style="color:white; text-decoration:none;">E-Commerce</a>
      </v-toolbar-title>

      <!-- Search Bar -->
      <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down" /> -->
      <v-spacer />

      <!-- Buttons Area -->
      <div v-if="!this.$store.state.token">
        <v-btn router-link to="/signin" class="ma-2" outlined color="white">
          <i class="fas fa-sign-in-alt mr-2"></i>
          Sign In
        </v-btn>
        <v-btn router-link to="/signup" class="ma-2" outlined color="white">
          <i class="fas fa-user-plus mr-2"></i>
          Sign Up
        </v-btn>
      </div>
      <div v-else>
        <v-btn @click="signOut" class="ma-2" outlined color="white">
          <i class="fas fa-sign-out-alt mr-2"></i>
          Sign Out
        </v-btn>
      </div>
    </v-app-bar>
    
    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <!-- Login Drawer -->
        <template v-if="this.$store.state.token">
          <v-list-item link router-link to="/products/">
            <v-list-item-action>
              <v-icon>storefront</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link router-link to="/products/user">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Products
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link router-link to="/cart">
            <v-list-item-action>
              <v-icon>shopping_cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Cart
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link router-link to="/transactions">
            <v-list-item-action>
              <v-icon>monetization_on</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Transactions
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
          <div class="grey--text" style="margin:20px;">
            <strong style="font-size:18px; margin-bottom:10px;"> Your Balance : <br/>
              Rp. {{ formatPrice(this.$store.state.user.balance) }}
            </strong>
          </div>
          <v-divider/>

          <!-- <v-list-group prepend-icon="monetization_on" append-icon="expand_more">
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Transactions
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list-item link router-link to="/transactions">
                <v-list-item-action>
                  <v-icon>local_shipping</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Ongoing
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link router-link to="/transactions">
                <v-list-item-action>
                  <v-icon>done_all</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Succeed
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link router-link to="/transactions">
                <v-list-item-action>
                  <v-icon>cancel</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Cancelled
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group> -->
          
        </template>
        <!-- Not Login Drawer -->
        <template v-else>
            <v-layout column align-center>
              <v-flex class="mt-10">
                <v-avatar size="100">
                  <img class="text-lg-center" src="../assets/shop.png">
                </v-avatar>
              </v-flex>
              <p style="color:green; margin-top:30px; text-align:center; font-family:Kaushan Script; font-size:24px;">
                Welcome <br/> to <br/> E-Commerce
              </p>
              <p style="color:green; margin-top:40px; text-align:center; font-family:Kaushan Script; font-size:20px;">
                Discover new products besides or sign in to unlock more interesting features
              </p>
              <v-btn router-link to="/signin" class="ma-2" outlined color="green">
                Get Started
              </v-btn>
            </v-layout>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Sub Router -->
    <v-content style="padding: 10px">
      <router-view></router-view>
    </v-content>

    <!-- Dialogue Button -->
    <v-btn v-if="this.$store.state.token" bottom color="green" dark fab fixed right @click="dialogAdd = !dialogAdd">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- Dialog -->
    <v-dialog v-model="dialogAdd" max-width="800px">
      <v-card>
        <v-card-title style="color:white;" class="green darken-1">
          Add New Product
        </v-card-title>
        <v-container>
          <v-row class="mx-2" style="margin-top:-15px">
            <v-col cols="12" sm="12" md="12">
              <v-form @submit.prevent="addProduct()" ref="addForm" enctype="multipart/form-data" >
                <v-text-field label="Name" v-model="name" name="name" :rules="nameRules" prepend-icon="label" type="text" />
                <v-textarea label="Description" v-model="description" name="description" :rules="descriptionRules" prepend-icon="assignment"></v-textarea>
                <v-text-field label="Price" v-model="price" name="price" :rules="priceRules"  prepend-icon="attach_money" type="number" />
                <v-text-field label="Stock" v-model="stock" name="stock" :rules="stockRules"  prepend-icon="move_to_inbox" type="number" />
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
                <v-switch label="Status" v-model="status" color="green" name="status" prepend-icon="flag" />
                
                <v-card-actions style="margin-top:-15px;">
                  <v-btn dark class="ma-3" color="green darken-1" type="submit">
                      <i class="fas fa-plus-square mr-2"></i>
                      Add
                  </v-btn>
                  <v-btn dark class="ma-3" color="green darken-1" @click="dialogAdd = false">
                      Cancel
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Snackbars -->
    <v-snackbar v-model="this.$store.state.snackbarHome" :timeout="2000" bottom color="success">
      <span>{{ this.$store.state.snackbarHomeMessage }}</span>
    </v-snackbar>
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
  name: 'Home',
  data: () => ({
      dialogAdd: false,
      drawer: null,
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
      successMessage: '',
      errorMessage: '',
    }),
    methods: {
      signOut() {
        localStorage.clear();
        this.$store.commit('SET_TOKEN', '');
        this.$store.commit('SET_USER', {});
        this.successMessage = 'You have signed out successfully';
        this.snackbarSuccess = true;
        this.$router.push('/products');
        window.location.reload();
      },
      addProduct() {
        if (this.$refs.addForm.validate()) {
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
            method: 'POST',
            url: '/products/',
            data: formData,
            headers: {
              "jwt_token": this.$store.state.token
            }
          })
          .then((response) => {
            this.name = '';
            this.description = '';
            this.price = '';
            this.stock = '';
            this.featured_image = [];
            this.status = false;
            this.dialogAdd = false;
            this.$store.commit('SET_SNACKBAR_HOME', true);
            this.$store.commit('SET_SNACKBAR_HOME_MESSAGE', 'Add product successfully');
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
    },
    created() {
      this.$router.push('/products');
    },
};
</script>

<style scoped>

</style>
