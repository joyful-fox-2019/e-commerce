<template>
  <div>
    <section>
      <form enctype="multipart/form-data" @submit.prevent="addProduct">
        <b-field
          horizontal
          label="Product Name"
          type="is-primary"
          message="Please enter a product name"
        >
          <b-input v-model="name" name="name" expanded></b-input>
        </b-field>

        <b-field horizontal label="Description">
          <b-input v-model="description" type="textarea"></b-input>
        </b-field>

        <b-field horizontal label="Price">
          <b-input v-model="price" name="price" placeholder="Price" expanded></b-input>
        </b-field>

        <b-field horizontal label="Stock">
          <b-input v-model="stock" name="stock" placeholder="Stock" expanded></b-input>
        </b-field>

        <b-field horizontal label="Add some tags">
          <b-taginput v-model="category" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
        </b-field>
        <b-field horizontal class="file">
          <b-upload v-model="image">
            <a class="button is-light">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="image">{{ image.name }}</span>
        </b-field>

        <b-field horizontal>
          <p class="control">
            <button class="button is-primary">Add Product</button>
          </p>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
const host = `https://e-commerce-api.sigitariprasetyo.xyz`;
// const host = `http://localhost:3000`

export default {
  name: "FormAddProduct",
  data() {
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: [],
      image: null,
      isFullPage: true
    };
  },
  methods: {
    addProduct() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });

      const formData = new FormData();
      formData.append("image", this.image);
      formData.set("name", this.name);
      formData.set("description", this.description);
      formData.set("price", this.price);
      formData.set("stock", this.stock);
      formData.set("category", this.category);

      axios({
        method: "post",
        url: `${host}/product/add`,
        data: formData,
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      })
        .then(product => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Add product success...`,
              type: "is-success"
            });
          }, 1200);
          this.$router.push("/");
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    }
  }
};
</script>
