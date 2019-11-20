<template>
  <div>
    <form enctype="multipart/form-data" @submit.prevent="addProducts()">
      <div class="form-group">
        <label>Product Name</label>
        <input type="text" class="form-control" placeholder="Product Name" v-model="name">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="3" v-model="description"></textarea>
      </div>
      <b-form-group label="Gender">
        <b-form-radio name="some-radios" value="men" v-model="gender">Men</b-form-radio>
        <b-form-radio name="some-radios" value="women" v-model="gender">Women</b-form-radio>
      </b-form-group>
      <div class="form-group">
        <label>Price</label>
        <input type="number" class="form-control" placeholder="20000" v-model="price">
      </div>
      <div class="form-group">
        <label>Stock</label>
        <input type="number" class="form-control" placeholder="20" v-model="stock">
      </div>
      <div class="form-group">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Insert product image here"
          drop-placeholder="Drop file here..."
          accept="image/*"
        ></b-form-file>
      </div>
      <button style="background-color: #222222; color: white; width: 100%" class="btn" type="submit">Add product</button>
    </form>
  </div>
</template>

<script>
export default {
  created() {
  },
  computed: {
    name: {
      get(){
        return this.$store.state.addProduct.name
      },
      set(value){
        this.$store.commit('CHANGE_ADD_NAME', value)
      }
    },
    description: {
      get(){
        return this.$store.state.addProduct.description
      },
      set(value){
        this.$store.commit('CHANGE_ADD_DESCRIPTION', value)
      }
    },
    price: {
      get(){
        return this.$store.state.addProduct.price
      },
      set(value){
        this.$store.commit('CHANGE_ADD_PRICE', value)
      }
    },
    stock: {
      get(){
        return this.$store.state.addProduct.stock
      },
      set(value){
        this.$store.commit('CHANGE_ADD_STOCK', value)
      }
    },
    file: {
      get(){
        return this.$store.state.addProduct.file
      },
      set(value){
        this.$store.commit('CHANGE_ADD_FILE', value)
      }
    },
    gender: {
      get(){
        return this.$store.state.addProduct.gender
      },
      set(value){
        this.$store.commit('CHANGE_ADD_GENDER', value)
      }
    }
  },
  methods: {
    addProducts(){
      this.$store.dispatch('addProduct')
    }
  }
}
</script>

<style>

</style>