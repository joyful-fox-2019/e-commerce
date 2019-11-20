<template>
  <div class="container-fluid">
    <Navbar/>
    <div class="container">
      <div class="row mt-4">
        <div class="col-sm-4">
          <ul class="list-group">
            <li class="list-group-item" style="cursor: pointer" @click.prevent="toTransaction()">Transaction List</li>
            <li class="list-group-item" style="cursor: pointer" @click.prevent="toProduct()">Product List</li>
            <li class="list-group-item" style="cursor: pointer" @click.prevent="toAddProduct()">Add product</li>
          </ul>
        </div>
        <div class="col-sm">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  methods: {
    toTransaction(){
      this.$router.push('/admin/transaction')
    },
    toProduct(){
      this.$router.push('/admin/product')
    },
    toAddProduct(){
      this.$router.push('/admin/add')
    }
  }
}
</script>

<style>

</style>