<template>
    <div class="container m-5 px-5">
        <div class="row">
            <div class="col-6">
                <img :src="product.image" :alt="product.name" class="image-fluid">
            </div>
            <div class="col-6">
                <h3>{{ product.name }}</h3>
                <p>Rp. {{ product.price }}</p>
                <label for="quantity" class="font-12">Quantity</label><br>
                <input placeholder="1" type="number" name="quantity" value=1 :min="1" :max="product.stock" class="my-2 p-1 quantity" v-model="quantity"><br>
                <button class="my-4 add-to-cart-btn p-2" @click="addToCart(product._id)">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productDetail',
  data () {
    return {
      product: {},
      quantity: 1
    }
  },
  methods: {
    addToCart (id) {
      console.log(id, this.quantity)
      this.$store
        .dispatch('addToCart', { id, quantity: this.quantity })
        .then(result => {
          if (result) {
            this.$router.push('/cart')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProduct () {
      this.$store
        .dispatch('fetchProductDetail', this.$route.params.id)
        .then(result => {
          this.product = result
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.fetchProduct()
  },
  created () {
    this.$store.dispatch('fetchLatestCart')
  }
}
</script>

<style scoped>
    img {
        width: 100%;
        height: auto;
    }

    .font-12 {
        font-size: 12px;
    }

    .quantity {
        background-color: white;
        border: 1px solid black;
    }

    .add-to-cart-btn {
        width: 200px;
        background-color: white;
        border: 2px solid #fc7978;
        color: #fc7978;
    }
</style>
