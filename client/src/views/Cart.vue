<template>
  <div class="container pt-4">
    <h3>SHOPPING CART</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Product Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in activeCart.detail" :key="product.detail._id">
          <td><img :src=product.detail.image></td>
          <td>{{ product.detail.name }}</td>
          <td>{{ product.detail.price }}</td>
          <td>
            <div class="black-border text-center">
              <button class="float-right update-btn"
              @click="addItem(product)"
              >+</button>
                <span>{{ product.quantity }}</span>
              <button class="float-left update-btn"
                @click="removeItem(product)">-</button>
            </div>

          </td>
          <td>Rp.{{ product.detail.price * product.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <div class="float-right p-4 mx-5 mb-5 black-border">
      Total Price: {{ activeCart.subtotal }}
      <hr>
      <button class="checkout-btn p-3">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {}
  },
  methods: {
    removeItem (product) {
      this.$store.dispatch('removeFromCart', product.detail._id)
      this.$store.dispatch('fetchLatestCart')
    },
    addItem (product) {
      this.$store
        .dispatch('addToCart', {
          id: product.detail._id,
          quantity: 1
        })
        .then(result => {
          if (result) {
            this.$router.push('/cart')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchLatestCart')
  },
  computed: {
    activeCart () {
      return this.$store.state.currentCart
    },
    productList () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
  img {
    width: 100px;
    height: 100px;
  }

  .black-border {
    border: 2px solid black;
    background-color: white;
  }

  .checkout-btn {
    background-color: black;
    color: white;
  }

  .update-btn {
    border: none;
    background-color: transparent;
  }
</style>
