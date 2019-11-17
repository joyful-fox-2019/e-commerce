<template>
  <div>
    <div class="row">
      <ProductCard
        v-for="(product) in this.$store.state.products"
        :key="product._id"
        :ProductData="product"
      ></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductBlock";
// import CategoryBlock from "@/components/CategoryBlock.vue";
export default {
  name: "ProductPage",
  components: {
    ProductCard
  },
  props: ["ProductData"],
  data() {
    return {
      products: []
    };
  },
  methods: {
    viewCart() {
      this.$router.push("/cart");
    }
  },
  created() {
    this.$store.dispatch("fetchProducts");
  }
};
</script>

<style>
</style>
