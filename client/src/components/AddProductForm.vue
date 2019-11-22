<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Product Name</label>
      <input v-model="productName" type="text" class="form-control" placeholder="Input product's name"/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Price</label>
      <input v-model="productPrice" type="text" class="form-control" placeholder="Input product's price" />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Stock</label>
      <input v-model="productStock" type="text" class="form-control" placeholder="Input product's stock" />
    </div>
    <div class="form-group">
      <b-col>
          <b-form-file v-model="productImage" :state="Boolean(productImage)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
    </b-col>
    </div>
    <button @click.prevent="addProduct" type="submit" class="btn btn-primary">Add Product</button>
  </form>
</template>

<script>
export default {
  name: 'AddProductForm',
  data () {
    return {
      productName: '',
      productPrice: '',
      productStock: '',
      productImage: null
    }
  },
  methods: {
    addProduct () {
      let objProduct = {
        productName: this.productName,
        productPrice: this.productPrice,
        productStock: this.productStock,
        productImage: this.productImage
      }
      this.$store.dispatch('addProduct', objProduct)
    }
  }
}
</script>

<style>
</style>
