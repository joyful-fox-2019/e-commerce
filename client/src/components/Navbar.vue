<template>
  <div>
    <b-navbar class="navbar-head" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <i class="fas fa-hard-hat"></i>&nbsp; Toko 46
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <router-link class="nav-link" to="/">
              <i class="fas fa-gifts"></i>&nbsp; Shopping
            </router-link>
          </b-navbar-nav>
          <b-nav-item-dropdown v-if="isLogin && isAdmin">
            <template v-slot:button-content>
              <span style="list-style-type:none">Admin</span>
            </template>
            <b-dropdown-item v-b-modal.add>Add Product</b-dropdown-item>
            <b-dropdown-item @click.prevent="checkHistory">Administration</b-dropdown-item>
            <b-dropdown-item @click.prevent="userSignout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="!isLogin">
            <router-link class="nav-link" to="/auth/register">Register</router-link>
            <router-link class="nav-link" to="/auth/login">Login</router-link>
          </b-navbar-nav>
          <b-nav-item-dropdown right v-if="isLogin && !isAdmin">
            <template v-slot:button-content>
              <em>Customer</em>
            </template>
            <b-dropdown-item @click.prevent="toCheckout">
              <i class="fas fa-shopping-cart"></i>
              &nbsp; Checkout
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="checkTransaction">
              <i class="far fa-calendar"></i>&nbsp; Transaction
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="userSignout">
              <i class="far fa-sad-tear"></i>&nbsp; Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- MODAL -->
    <b-modal
      id="add"
      title="Add Product"
      cancel-title="Cancel"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      ok-variant="outline-dark"
      @ok="addProduct"
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
      <img :src="imageLink" alt width="200" />
      <input @change="uploadImage" type="file" class="custom-file-input" accept="image/*" />
      <b-button style="margin-top: -3rem;">Upload</b-button>
    </b-modal>
    <!-- MODAL -->
  </div>
</template>

<script>
import server from "../api/server";
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      stock: "",
      price: "",
      imageLink:
        "https://i2.wp.com/www.scribblesandcrumbs.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg?w=1170",
      img: ""
    };
  },
  methods: {
    toCheckout() {
      this.$router.push("/user/cart");
    },
    checkHistory() {
      this.$router.push("/admin");
    },
    checkTransaction() {
      this.$router.push("/user/transaction");
    },
    userSignout() {
      this.$store.dispatch("userSignout");
      this.$router.push("/");
    },
    addProduct() {
      server({
        method: "post",
        url: "/products",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image: this.imageLink
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("getProducts");
          this.name = "";
          this.price = "";
          this.stock = "";
          this.img = "";
          this.imageLink =
            "https://i2.wp.com/www.scribblesandcrumbs.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg?w=1170";
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    uploadImage(event) {
      this.img = event.target.files[0];
      let bodyFormData = new FormData();
      if (this.img) {
        Swal.fire({
          title: "wait a minute to upload data",
          allowOutsideClick: true
        });
        Swal.showLoading("Please wait..");
      } else {
        Swal.fire({
          icon: "error",
          title: "No Image Selected"
        });
      }
      bodyFormData.append("image", this.img);
      server({
        method: "post",
        url: "upload",
        data: bodyFormData,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.imageLink = data.link;
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Image Uploaded"
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    }
  },
  computed: {
    ...mapState(["isAdmin", "isLogin"])
  }
};
</script>

<style scoped>

</style>
