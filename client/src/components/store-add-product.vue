<template>

    <div class="dadd-product-container d-flex justify-content-center">
        <div class="product-pic">
            <h5>Product Image</h5>
            <img src="https://ecs7.tokopedia.net/img/attachment/2019/10/14/40768394/40768394_a4b8c9ee-581e-4be6-b320-b467276927ec.jpg" alt="">
            <input class="my-4" type="file" @change="onFileSelected" ref="file"  accept="image/*" />
        </div>
        <div class="product-input">
            <form @submit.prevent="create" class="d-flex flex-column m-3" action="">
                <input v-model="name" type="text" placeholder="name">
                <input v-model="price" type="number" min="0" placeholder="price">
                <textarea v-model="desc" cols="30" rows="5" placeholder="description"></textarea>
                <input v-model="stock" type="number" min="1" placeholder="stock">
                <button class="btn btn-success">Add</button>
            </form>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      name: '',
      price: '',
      desc: '',
      stock: '',
      selectedFile: null,
      file: ''
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.file = this.selectedFile
    },
    create () {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('price', this.price)
      fd.append('desc', this.desc)
      fd.append('stock', this.stock)
      fd.append('file', this.file)
      this.$store.dispatch('CREATE_PRODUCT', fd)
    }
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
    border-radius: 50% ;
    margin-bottom: 10px;
}

.product-input input, textarea{
    width: 300px ;
    margin: 10px 0;
    padding: 5px 15px;
}

</style>
