<template>
  <section id="home">
    <div class="products-display">
      <div
        v-if="currentUser.role === 'admin'"
        class="button is-primary"
        @click="isFormAddProductActive = true"
      >Add a product</div>
      <b-modal
        :active.sync="isFormAddProductActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <FormAddProduct/>
      </b-modal>
      <div v-for="(productGroup, i) in productsBy5" :key="i" class>
        <ProductCardGroup :product-group="productGroup" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import ProductCardGroup from "../components/ProductCardGroup";
import FormAddProduct from "../components/FormAddProduct";

export default {
  data: () => ({
    isFormAddProductActive: false,
    products: []
  }),

  methods: {
    addProduct: function() {},

    chunkArrayInGroups: function(arr, size) {
      var myArray = [];
      for (var i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
      }
      return myArray;
    }
  },

  mounted() {
    this.$store.dispatch("fetchCurrentUser");
    this.$store.dispatch("fetchAllProducts");
    console.log("mounted dan dispatched");
  },

  components: {
    ProductCardGroup,
    FormAddProduct
  },

  computed: {
    productsBy5() {
      const result = this.chunkArrayInGroups(this.allProducts, 6);
      // console.log("group", result);
      return result;
    },
    ...mapState(["allProducts", "currentUser"])
    // products
  }
};
</script>

<style scoped>
#home {
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("../assets/1511.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.products-display {
  margin: 2vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  /* background-color: white; */
  /* height: 88vh; */
  /* width: 90vw; */
}

.column {
  padding: 0;
}
</style>