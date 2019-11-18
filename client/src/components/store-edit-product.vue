<template>

    <div class="dadd-product-container d-flex justify-content-center align-items-start">
        <div class="product-pic">
            <h5>Product Image</h5>
            <img :src="product.image" alt="">
            <input class="my-4" type="file" @change="onFileSelected" ref="file"  accept="image/*" />
        </div>
        <div class="product-input">
            <form @submit.prevent="update" class="d-flex flex-column m-3" action="">
                <input v-model="product.name" type="text" placeholder="name">
                <input v-model="product.price" type="text" placeholder="price">
                <textarea v-model="product.desc" cols="30" rows="5" placeholder="description"></textarea>
                <input v-model="product.stock" type="number" min="0" placeholder="stock">
                <button class="btn btn-success">Update</button>
            </form>
        </div>
        <i @click="deleteProduct" class="fas delete fa-trash-alt"></i>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'edit-product',
  data () {
    return {
      selectedFile: null,
      file: ''
    }
  },
  computed: {
    ...mapState(['product'])
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.file = this.selectedFile
    },
    update () {
      const fd = new FormData()
      let id = this.$route.params.id
      fd.append('name', this.product.name)
      fd.append('price', this.product.price)
      fd.append('desc', this.product.desc)
      fd.append('stock', this.product.stock)
      fd.append('file', this.file)
      this.$store.dispatch('UPDATE_PRODUCT', { id, fd })
    },
    deleteProduct () {
      let id = this.$route.params.id
      this.$store.dispatch('DELETE_PRODUCT', id)
    }
  },
  created () {
    let id = this.$route.params.id
    this.$store.dispatch('GET_ONE_PRODUCT', id)
  }

}
</script>

<style scoped>

.dadd-product-container{
    width: 100%;
    padding: 50px;
}

.product-pic{
    padding: 20px;
    width: 300px;
    height: 400px;
    border-radius: 15px ;
    box-shadow: 6px 4px 20px 0px rgba(0, 0, 0, 0.171);
    background: #11998e;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.product-pic img{
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
}

.product-input input, textarea{
    width: 300px ;
    margin: 10px 0;
    padding: 5px 15px;
}

.delete{
    cursor: pointer;
    font-size: 25px;
    color: tomato;
}

</style>
