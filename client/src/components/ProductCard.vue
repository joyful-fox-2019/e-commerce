<template>
  <div class="product">
    <b-container fluid>
      <b-row class="text-center" style="margin-bottom: 5%;">
        <b-col v-for="product in paginatedData" :key="product._id">
          <a href="#" @click.prevent="showDesc(product)">
            <img
              id="imgProd"
              :src="product.image"
              alt="product1"
              style="width: 385px; height: 385px;"
            />
          </a>
        </b-col>
      </b-row>
      <div class="paginate">
        <button @click="prev" :disabled="pageNumber === 0">Previous</button>
        <button @click="next" :disabled="pageNumber === 4">Next</button>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      pageNumber: 0
    };
  },
  methods: {
    next() {
      this.pageNumber++;
    },
    prev() {
      this.pageNumber--;
    },
    showDesc(product) {
      this.$router.push(`/${product._id}`);
      this.$store.commit("SHOW_DESC", product);
    },
    fetchProducts() {
      axios({
        url: `http://localhost:3000/products`,
        method: "GET"
      })
        .then(({ data }) => {
          this.products = data.products;
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
    paginatedData() {
      const start = this.pageNumber * 3,
        end = start + 3;
      return this.products.slice(start, end);
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style>
.btn-nav {
  text-align: center;
  border: 2px solid;
  width: 20%;
  margin: 0 auto;
  border-radius: 12px;
}
.paginate {
  text-align: center;
}
.paginate button {
  background-color: #17a2b8;
  border: none;
  margin-right: 10px;
  padding: 10px;
  border-radius: 16px;
  width: 10%;
}
.paginate button:hover {
  background-color: deepskyblue;
}
#imgProd:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
