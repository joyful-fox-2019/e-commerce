<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <p class="title">Add Products</p>
            <div class="box">
                <FormAddProduct></FormAddProduct>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import FormAddProduct from './form/formAddProduct'

export default {
  name: 'AddProduct',
  components: {
    Navbar,
    FormAddProduct
  }
}
</script>
<style scoped>
    .title {
        margin-top: 50px;
        text-align: center;
    }
</style>
