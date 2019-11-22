<template>
  <div>
    <div class="nav">
      <b-button variant="info" class="mb-3" to="/">Home</b-button>
      <h1 style="margin-left: 40%;">Your Cart</h1>
    </div>
    <CartCard />
  </div>
</template>

<script>
import CartCard from "@/components/CartCard.vue";

export default {
  name: "cart",
  components: {
    CartCard
  }
};
</script>

<style>
</style>
