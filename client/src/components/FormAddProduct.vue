<template>
  <form action>
    <div class="modal-card" style="max-width: 500px">
      <header class="modal-card-head">
        <p class="modal-card-title">Add a product</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input v-model="name" placeholder="Harry Potter and the Philosopher's Stone" required></b-input>
        </b-field>

        <b-field label="Author">
          <b-input v-model="author" placeholder="J.K. Rowling" required></b-input>
        </b-field>

        <b-field label="Price">
          <b-input v-model="price" placeholder="144500" required></b-input>
        </b-field>

        <b-field label="Stock">
          <b-input v-model="qty" placeholder="15" required></b-input>
        </b-field>

        <b-field label="Description">
          <b-input
            type="textarea"
            v-model="description"
            placeholder="Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his..."
          ></b-input>
        </b-field>

        <b-field class="file">
          <b-upload v-model="file">
            <a class="button is-light has-text-primary">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload image</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">{{ file.name }}</span>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary" @click.prevent="addProduct">Submit</button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from "../../config/axios";

export default {
  name: "form-add-product",

  data: () => ({
    name: "",
    price: null,
    qty: null,
    description: "",
    imageUrl: "",
    author: "",
    file: null
  }),

  methods: {
    addProduct: function() {
      let data = new FormData();
      data.append("image", this.file);

      axios({
        method: "post",
        url: "/products/upload-image",
        data,
        headers: localStorage.getItem("access_token")
      })
      .then(({ data }) => {
        imageUrl = data;
        // console.log("ini response", data);
        return axios({
          method: "post",
          url: "/products",
          data: {
            name: this.name,
            price: this.price,
            qty: this.qty,
            description: this.description,
            imageUrl: "",
            author: this.author
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => console.log(err)
      )
    }
  }
};
</script>

<style>
</style>