<template>
  <div>
    <div class="mx-auto flex-column justify-center items center m-10 ">
      <div class="form-title mt-10">
        <h1>EDIT PRODUCT</h1>
      </div>
      <div v-if="product.image" class="p-2 flex justify-center items-center">
        <img :src="product.image" alt="image" class="h-48 mt-2 shadow">
      </div>
      <div class="product-info flex flex-wrap my-4 w-1/2 shadow mx-auto">
        <label class="mx-10 mt-4">Product Name</label>
        <input type="text" v-model="product.name" placeholder="Product name" class="p-2 mx-10 my-2 border border-gray-300 w-full">
      <label class="mx-10 mt-2">Product Price</label>
        <input type="number" min="0" v-model="product.price" placeholder="$ Product price" class="p-2 mx-10 my-2 border border-gray-300 w-full">
      <label class="mx-10 mt-2">Product Stock</label>
        <input type="number" min="0" v-model="product.stock" placeholder="Product Stock" class="p-2 mx-10 my-2 border border-gray-300 w-full">
      </div>
      <div class="product-image-insert flex flex-wrap justify-center  w-1/2 mx-auto shadow p-4">
        <h2 class="w-full mb-4">Add a product image:</h2>
          <input type="file" id="files" @change="selectImage"  class="border border-gray-200 p-2 rounded shadow">
      </div>
      <div class="submit-btn m-4 flex justify-center shadow w-1/2 mx-auto">
          <button class="p-2 bg-blue-400 hover:bg-blue-300 m-2" @click="submitProduct">Submit</button>
          <button class="p-2 bg-red-500 hover:bg-red-300 m-2" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {
        name: '',
        stock: null,
        price: null,
        image: null
      }
    }
  },
  methods: {
    selectImage (event) {
      this.product.image = event.target.files[0]
    },
    submitProduct () {
      let fd = new FormData()
      const { name, stock, price, image } = this.product

      if (image) fd.append('image', image)
      fd.append('name', name)
      fd.append('stock', stock)
      fd.append('price', price)

      let payload = {}
      payload.data = fd

      if (this.$route.params.id) {
        payload.id = this.$route.params.id
        this.$store.dispatch('updateProduct', payload)
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      } else {
        this.$store.dispatch('addProduct', payload)
          .then(({ data }) => {
            this.$notify({ type: 'success', title: data.message })
            this.product = {}
          })
          .catch(({ response }) => {
            this.$notify({ type: 'error', title: response.data.message })
          })
      }
    },
    cancel () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store.dispatch('fetchProductById', { id: this.$route.params.id })
        .then(({ data }) => {
          this.product = data
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', text: response.data.message })
        })
    }
  }

}
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
