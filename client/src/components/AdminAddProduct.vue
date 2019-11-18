<template>
  <form class="addproduct">
    <div class="form-group">
      <label for style="font-size: 13px; font-weight: bold;">Product Name</label>
      <input
        v-model="name"
        type="text"
        class="form-control form-control-danger"
        placeholder="Product Name"
        style="font-size: 13px;"
      />
    </div>
    <div class="row">
      <div class="col-6 form-group">
        <label for style="font-size: 13px; font-weight: bold;">Stock</label>
        <input
          v-model="stock"
          type="Number"
          min="0"
          class="form-control form-control-danger"
          placeholder="Stock"
          style="font-size: 13px;"
        />
      </div>
      <div class="form-group col-6">
        <label for style="font-size: 13px; font-weight: bold;">Price</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" style="font-size: 13px;">IDR</span>
          </div>
          <input
            style="font-size: 13px;"
            v-model="price"
            type="text"
            class="form-control"
            aria-label="Price"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for style="font-size: 13px; font-weight: bold;">Category</label>
      <input
        style="font-size: 13px;"
        v-model="category"
        type="text"
        class="form-control"
        aria-label="Category"
      />
    </div>

    <label for style="font-size: 13px; font-weight: bold;">Image</label>
    <div class="custom-file">
      <label style="font-size: 13px;" class="custom-file-label" for="inputGroupFile04">Choose file</label>
      <input
        v-on:change="getImage"
        type="file"
        class="mb-4 custom-file-input"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
        style="font-size: 13px;"
      />
    </div>

    <br />
    <label style="font-size: 13px; font-weight: bold;" for="comment">Description</label>
    <textarea
      style="font-size: 13px;"
      v-model="description"
      class="form-control"
      rows="3"
      id="description"
    ></textarea>

    <div style="font-size: 13px;" v-if="$route.params.id == undefined">
      <button @click.prevent="addProduct" type="submit" class="mt-4 adminbtn btn">Submit</button>
    </div>
    <div v-else>
      <button
        @click.prevent="updateProducts($route.params.id)"
        type="submit"
        class="mt-4 adminbtn btn"
      >Edit</button>
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "AddProduct",
  components: {},
  props: ["currentProduct"],
  data() {
    return {
      name: "",
      stock: "",
      price: "",
      description: "",
      image: "",
      category: ""
    };
  },
  watch: {
    currentProduct() {
      if (this.$route.params.id != undefined) {
        this.name = this.currentProduct.name;
        this.stock = this.currentProduct.stock;
        this.price = this.currentProduct.price;
        this.description = this.currentProduct.description;
        this.category = this.currentProduct.category;
        this.image = this.currentProduct.image;
      }
    }
  },
  methods: {
    addProduct() {
      console.log(this.price, this.name);
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("description", this.description);
      formData.append("image", this.image);
      formData.set("stock", this.stock);
      formData.set("price", this.price);
      formData.set("category", this.category);
      let payload = formData;
      console.log(`trigger`, formData);

      this.$store
        .dispatch("addProduct", payload)
        .then(() => {
          console.log(`masuuuk`);
          this.name = "";
          this.stock = "";
          this.price = "";
          this.description = "";
          this.image = "";
          this.category = "";
          this.$emit("successaddproduct", this.name);
          Swal.fire("Product added", "View it on your dashboard", "success");
          this.$router.push("/admin");
          this.$store.dispatch("fetchProducts").then(data => {
            this.$router.push("/admin");
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire(`Something is wrong`, "Please reload", "error");
        });
    },
    updateProducts(id) {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("stock", this.stock);
      formData.append("price", this.price);
      formData.append("category", this.category);
      formData.append("image", this.image);
      let payload = formData;

      this.$store
        .dispatch("updateProduct", payload)
        .then(data => {
          this.name = "";
          this.stock = "";
          this.price = "";
          this.description = "";
          this.category = "";

          Swal.fire("Product updated", "View it on your dashboard", "success");
          this.$router.push("/admin");
          this.$store.dispatch("fetchProducts").then(data => {
            this.$router.push("/admin");
          });

          this.$emit("successupdateProducts");
        })
        .catch(err => {
          Swal.fire(`Something is wrong`, "Please reload", "error");
        });
    },
    getImage() {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  },
  created() {}
};
</script>

<style>
.addproduct {
  width: 400px;
  border: 1px solid rgb(199, 199, 199);
  padding: 20px;
  border-radius: 3%;
}
.btnremove .admin-left {
  border-right: 1px solid grey;
}

.btncard {
  background-color: transparent;
  font-size: 12px;
  color: black;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.btncard:hover {
  background-color: rgb(230, 230, 230);
}

.adminbtn {
  margin: 2px;
  display: inline-block;
  width: 130px;
  background-color: grey;
  font-size: 12px;
  color: white;
  border-style: 1px solid grey !important;
  border-radius: 22px;
}

.adminbtn:hover {
  opacity: 0.6;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
