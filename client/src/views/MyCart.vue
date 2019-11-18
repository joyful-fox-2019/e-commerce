<template>
  <div id="mycart">
    <div class="header-text">
      <h1 class="is-size-4">Your cart</h1>
    </div>
    <div class="cart-container">
      <div class="checkout-container">
        <img
          class="shopping-cart-img"
          src="https://icon-library.net/images/shopping-cart-icon-png-transparent/shopping-cart-icon-png-transparent-27.jpg"
          alt="cart-icon"
          srcset
        />
        <p>
          You have {{totalProductQtyInCart}} items for a total of
          <strong>Rp{{totalProductPriceInCart.toLocaleString('id')}}</strong>
        </p>
        <button class="button is-primary">Checkout</button>
      </div>
      <hr>
      <div class="products-container">
        <p><strong>Shopping cart details</strong></p>
        <hr>
        <div v-for="product in myCart.cart.products" :key="product._id">
          {{product}}
          ini imageUrl {{product.imageUrl}}
          <ProductCardCart :product="product" />
        </div>
        <!-- {{myCart}} -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCardCart from '../components/ProductCardCart'

export default {
  name: "my-cart",

  mounted() {
    // this.$store.dispatch("fetchMyCart");
    // console.log(this.myCart)
  },

  computed: mapState({
    myCart: "myCart",

    totalProductQtyInCart(state) {
      let totalQty = 0;
      console.log("ini total products", state.myCart);

      state.myCart.cart.products.forEach(product => {
        if (product.qty) totalQty += product.qty;
      });
      return totalQty;
    },

    totalProductPriceInCart(state) {
      let totalPrice = 0;
      console.log("ini total products", state.myCart);

      state.myCart.cart.products.forEach(product => {
        if (product.productId.price)
          totalPrice += product.productId.price * product.qty;
      });
      return totalPrice;
    }
  }),

  components: {
    ProductCardCart
  }
  // ...mapGetters(["totalProductQtyInCart"])
};
</script>

<style scoped>
#mycart {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: left; */

  background-image: url("../assets/1511.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 92vh;
}

hr {
  margin: 1% 0;
}

.header-text {
  margin: 10px 10%;
  margin-left: 10%;
}

.header-text > h1 {
  color: white;
  font-weight: 700;
}

.cart-container {
  margin: 0 10%;
  background-color: white;
  box-shadow: 2px 4px 11px -1px rgba(0, 0, 0, 0.28);
}

.checkout-container {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-container > p {
  margin-right: 25px;
}

.shopping-cart-img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.products-container {
  margin: 0 5%;
  margin-bottom: 5%;
}

</style>