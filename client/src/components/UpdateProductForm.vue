<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Product Name</label>
      <input v-model="name" type="text" class="form-control" placeholder="Input product's name"/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Product Price</label>
      <input v-model="price" type="text" class="form-control" placeholder="Input product's price" />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Stock</label>
      <input v-model="stock" type="text" class="form-control" placeholder="Input product's stock" />
    </div>
    <div class="form-group">
        <b-col>
            <b-form-file v-model="image" :state="Boolean(image)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
        </b-col>
    </div>
    <button @click.prevent="updateProduct" type="submit" class="btn btn-primary">Update Product</button>
  </form>
</template>

<script>
export default {
  name: 'UpdateProductForm',
  data () {
    return {
      id: this.$store.state.dataGonnaBeUpdated._id,
      name: this.$store.state.dataGonnaBeUpdated.name,
      price: this.$store.state.dataGonnaBeUpdated.price,
      stock: this.$store.state.dataGonnaBeUpdated.stock,
      image: ''
    }
  },
  methods: {
    updateProduct () {
      let objUpdate = {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        image: this.image
      }
      this.$store.dispatch('updateProduct', objUpdate)
    }
  }
}
</script>

<style>

</style>
