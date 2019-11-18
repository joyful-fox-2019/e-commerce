<template>
  <div>
    <div class="container">
      <div v-if="!isLogin" class="row">
        <div class="col-4 text-center"></div>
        <div class="py-5 px-5 col-4 text-center">
          <h3>Your Cart</h3>
          <button class="btn btncard">Continue Shopping</button>
        </div>
        <div class="col-4 text-center"></div>
      </div>
      <div class="row">
        <div class="py-3 px-3 col-12">
          <h3 class="yc">Your Cart</h3>
          <table class="table table-hover">
            <tbody>
              <tr v-for="(item, index) in cart" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>
                  <img style="max-width:10vh;" :src="item.product_image" />
                </td>
                <td>{{item.product_name}}</td>
                <td>{{item.quantity}}</td>
                <td>IDR {{subtotal(item.quantity, item.product_price)}}</td>
                <td>
                  <small
                    id="remove"
                    href
                    v-on:click="removeFromCart(item._id)"
                    style="color:red"
                  >remove</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style=" display: flex; justify-content: center;">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="yc text-muted">Order Summary</span>
            <span
              class="badge badge-secondary"
              style="font-size:13; !important"
            >{{this.totalProductsInCart}}</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (IDR)</span>
              <strong>{{getTotalCart.toLocaleString()}}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["isLogin"],
  name: "Carts",
  data() {
    return {
      cartItems: [],
      totalProductsInCart: 0,
      sumPrice: 0 //total
    };
  },
  computed: {
    ...mapState(["cart"]),
    getTotalCart() {
      let total = 0;
      this.cartItems.forEach(item => (total += item.quantity * item.price));
      this.sumPrice = total;
      return total;
    }
  },
  methods: {
    viewCart() {
      console.log(`panggil`);
      this.$store
        .dispatch("viewCart")
        .then(data => {
          console.log(data);
          this.cartItems = data;
          this.totalProductsInCart = 0;
          data.forEach(cartItem => {
            this.totalProductsInCart += cartItem.quantity;
          });
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire(
            "Something went wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    subtotal(qty, prc) {
      let res = qty * prc;
      return res.toLocaleString();
    },
    removeFromCart(id) {
      this.$store
        .dispatch("removeFromCart", id)
        .then(() => {
          this.viewCart();
          Swal.fire("Item deleted", "You may continue shopping", "success");
        })
        .catch(err => {
          console.log(err);

          Swal.fire(
            "Something went wrong",
            "Please reload the page",
            "warning"
          );
        });
    }
  },
  created() {
    this.viewCart();
  }
};
</script>

<style>
.yc {
  font-size: 15px;
  letter-spacing: 0.1em;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Lato", serif;
}

.atc {
  border-radius: 0px;
  color: white;
  font-size: 12.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
#quantity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.summ {
  font-family: "Lato", serif;
  font-size: 15px;
  letter-spacing: 0.11em;
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
  border-style: none !important;
  color: black;

  background-color: rgb(230, 230, 230);
}

#remove:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
