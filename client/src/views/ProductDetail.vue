<template>
  <div class="flex p-2 justify-center m-2 shadow bg-white">
    <div class="flex flex-wrap items-center justify-around">
      <div class="product-image md:w-1/2 xs:w-full flex items-center p-4" style="height: 100%;">
        <img :src="product.image" alt="image" class="object-contain w-full">
      </div>
      <div class="product-info flex-column xs:w-full md:w-1/2" style="height: 100%; border-left: 0.6px solid lightgray;">
        <div class="my-4">
          <h1>{{ product.name }}</h1>
        </div>
        <div class="w-full product-detail my-10">
          <h4>price: {{ product.price? usdFormat(product.price) : '' }}</h4>
          <h4>stock: {{ product.stock }} pcs</h4>
          <h4>sold: {{ product.sold }} pcs </h4>
          <h4>favourited: {{ product.likes }}</h4>
        </div>
        <div v-if="isLogin && !isAdmin" class="product-action w-full flex justify-center mx-1 ">
          <form class=" flex justify-around flex-wrap" @submit.prevent="addToCart">
            <select class="p-2 focus:text-blue-800 m-2 cursor-pointer" v-model="qty">
              <option v-for="index in product.stock" :key="index" :value="index">{{index}}</option>
            </select>
              <input type="submit" value="Add to Cart" class="p-2 m-2 cursor-pointer hover:bg-gray-500">
          </form>
          <button class="p-2 m-2 bg-red-400 hover:bg-red-500" @click="favourite">{{ this.product.favourites? favButton : 'favourite' }}</button>
        </div>
        <div v-if="isAdmin" class="w-full flex justify-center">
          <button class="p-2 m-2 bg-green-400" @click="editProduct">Edit Product</button>
          <button class="p-2 m-2 bg-red-600" @click="deleteProduct">Delete Product</button>
        </div>

        <div class="w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {},
      qty: null
    }
  },
  methods: {
    usdFormat (val) {
      return (val).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    editProduct () {
      this.$router.push(`/edit/${this.$route.params.id}`)
    },
    deleteProduct () {
      this.$dialog({
        title: 'Deleting',
        content: 'Are you sure about this?',
        btns: [
          {
            label: 'Yes',
            color: '#09f',
            callback: () => {
              this.deleteConfirmed()
            }
          },
          {
            label: 'No',
            color: '#444',
            ghost: true
          }
        ]
      })
    },
    deleteConfirmed () {
      this.$store.dispatch('deleteProduct', { id: this.$route.params.id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          this.$router.push('/products')
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    fetchProduct () {
      this.$store.dispatch('fetchProductById', { id: this.$route.params.id })
        .then(({ data }) => {
          this.product = data
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', text: response.data.message })
        })
    },
    addToCart () {
      this.$store.commit('ADD_TO_CART', { product: this.product._id, qty: this.qty })
      this.$store.dispatch('updateCart', { cart: this.cart })
      this.$notify({ type: 'info', title: 'Successfully update your cart' })
    },
    favourite () {
      this.$store.dispatch('favourite', { id: this.product._id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          if (this.$route.path.includes('favorites')) {
            this.$store.dispatch('fetchFav')
            this.$emit('change-favorite')
            setTimeout(() => {
              this.$router.push('/myaccount/favorites')
            }, 500)
          }
          this.fetchProduct()
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    }
  },
  computed: {
    ...mapState(['isLogin', 'cart', 'isAdmin']),
    favButton () {
      let button = 'Favourite'
      this.product.favourites.forEach(favUser => {
        if (favUser._id === localStorage.getItem('userId')) button = 'Unfavourite'
      })
      return button
    }
  },
  created () {
    this.fetchProduct()
  },
  watch: {
    '$route.params.id' () {
      this.fetchProduct()
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 2em;
  }
  h4 {
    font-size: 1.1em;
  }
</style>
