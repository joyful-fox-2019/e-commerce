<template>
  <div>
    <b-button to="/" variant="info">Home</b-button>
    <div class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Product Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.stock"
            type="number"
            required
            placeholder="Stock"
            min="1"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Price:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.price"
            type="number"
            required
            placeholder="Price"
            min="1"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Description:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.description"
            type="text"
            required
            placeholder="Description"
          ></b-form-input>
        </b-form-group>

        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        stock: 0,
        price: 0,
        description: ""
      },
      file: null
    };
  },
  methods: {
    onSubmit() {
      let fd = new FormData();
      fd.append("name", this.form.name);
      fd.append("price", this.form.price);
      fd.append("stock", this.form.stock);
      fd.append("image", this.file);
      fd.append("description", this.form.description);
      axios({
        url: "http://localhost:3000/products",
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        data: fd
      })
        .then(({ data }) => {
          this.form.name = "";
          this.form.price = 0;
          this.form.stock = 0;
          this.form.description = "";
          this.file = null;
          this.$swal({
            type: "success",
            text: "Create Success !"
          });
          this.$router.push("/");
        })
        .catch(err => {
          this.name = "";
          this.price = 0;
          this.stock = 0;
          this.description = "";
          this.file = null;
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>