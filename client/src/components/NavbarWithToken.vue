<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="https://img.icons8.com/color/452/add-book.png" alt="Bookplus logo" />
        <h1>Book+</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">Home</b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">About</b-navbar-item>
        <b-navbar-item href="#">Contact</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <b-navbar-item href="#">
          <img
            class="shopping-cart-img"
            src="https://icon-library.net/images/shopping-cart-icon-png-transparent/shopping-cart-icon-png-transparent-27.jpg"
            alt="cart-icon"
            srcset
          />
        </b-navbar-item>
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign out</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "navbar-with-token"
};
</script>

<style scoped>
  .shopping-cart-img {
    margin-right: 10px;
  }
</style>