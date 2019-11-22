<template>
  <div>
    <div class="mt-4">
      <h4>{{data.name}}</h4>
      <b-card :img-src="data.image" img-alt="Card image" img-left class="mb-3 img-card">
        <b-card-text>{{data.description}}</b-card-text>
        <h3>Price : {{data.price}}</h3>
        <h6>Stock : {{data.stock}}</h6>
        <div class="btndesc" style="display:flex; flex-direction: column; width: 15%;">
          <input
            type="number"
            v-model="quantity"
            min="0"
            required
            style="border-radius:12px; margin-bottom: 5%; text-align:center;"
          />
          <button
            v-if="data.stock > 0"
            type="button"
            @click="addCart(data._id)"
            style="margin-bottom: 5%; border-radius: 12px; background-color: #17a2b8; border:none;"
          >Add to Cart</button>
          <button
            type="button"
            v-b-modal.modal-3
            v-if="isAdmin"
            style="margin-bottom: 5%; border-radius: 12px; background-color: #17a2b8; border:none;"
          >Edit</button>
        </div>
        <b-modal ref="modaledit" id="modal-3" title="BootstrapVue" hide-footer>
          <b-form @submit.prevent="onEdit(data._id)">
            <b-form-group id="input-group-1" label="Name:" label-for="input-1">
              <b-form-input id="input-1" type="text" required v-model="name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Price:" label-for="input-2">
              <b-form-input id="input-2" type="number" required v-model="price"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
              <b-form-input id="input-2" type="number" required v-model="stock"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description:" label-for="input-2">
              <b-form-input id="input-2" type="text" required v-model="description"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Edit</b-button>
          </b-form>
          <b-button
            type="button"
            variant="danger"
            style="margin-top: 3%;"
            @click="onDelete(data._id)"
          >Delete</b-button>
        </b-modal>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "description",
  data() {
    return {
      name: this.$store.state.descData.name,
      price: this.$store.state.descData.price,
      description: this.$store.state.descData.description,
      stock: this.$store.state.descData.stock,
      quantity: 0
    };
  },
  methods: {
    addCart(id) {
      if (!this.login) {
        alert("belom login");
      } else {
        this.$router.push("/");
        this.$store.commit("BACK_HOME");
        this.$swal({
          type: "success",
          title: "Success adding to cart"
        });
        this.$store.dispatch("ADD_CART", { id, qty: this.quantity });
      }
    },
    onEdit(id) {
      axios({
        url: "http://localhost:3000/products/" + id,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          name: this.name,
          price: this.price,
          description: this.description,
          stock: this.stock
        }
      })
        .then(({ data }) => {
          this.getProduct();
          this.$refs["modaledit"].hide();
          this.$swal({
            type: "success",
            title: "Successfull Edit"
          });
        })
        .catch(err => {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    },
    onDelete(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          axios({
            url: "http://localhost:3000/products/" + id,
            method: "DELETE",
            headers: {
              token: localStorage.getItem("token")
            }
          }).then(({ data }) => {
            this.getProduct();
            if (result.value) {
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            }
            this.$refs["modaledit"].hide();
          });
        })
        .catch(err => {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    }
  },
  computed: {
    getProduct() {
      return this.$store.state.allProduct;
    },
    isAdmin() {
      return this.$store.state.admin;
    },
    data() {
      return this.$store.state.descData;
    },
    login() {
      return this.$store.state.login;
    }
  }
};
</script>

<style>
.img-card img {
  width: 385px;
  height: 385px;
}
</style>
