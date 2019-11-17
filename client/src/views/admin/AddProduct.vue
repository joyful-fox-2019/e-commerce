<template>
  <div id="addPage">
    <div id="titleAdd">
      <h4 > Add new product</h4>
    </div>
    <q-form
      class="q-gutter-md"
      @submit.prevent="submitProduct"
    >
    <q-input 
      outlined 
      type="text"
      label="Product name" 
      v-model="productName"
      stack-label 
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please input product name']"
      required
      :dense="true" />

      <q-editor
      v-model="desc"
      :definitions="{
        bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
      }"
      :rules="[ val => val && val.length > 0 || 'Please input product descriptions']"
      />

      <q-input 
      outlined
      type="number"
      v-model="stock" 
      label="Stock" 
      stack-label 
      lazy-rules
      :rules="[ val => val && val > 0 || 'Please input product stock']"
      :dense="true" />

      <q-input 
      outlined
      type="number" 
      v-model="price"
      label="Price" 
      stack-label 
      lazy-rules
      min="1000"
      :rules="[ val => val && val > 1000 || 'Input product price minimal 1000']"
      :dense="true" />

        <div>

      ( to upload an image, select image first, then click cloud button)
        </div>
     <q-uploader
        url=""
        label="Image"
        color="blue"
        :factory="factoryFn"
        square
        flat
        bordered
        style="max-width: 300px"
      />
    
      <div>
        <q-btn label="Submit" type="submit" color="primary" id="submitButton"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'addProduct',
  data(){
    return{
      productName : '',
      desc: '',
      price: 1000,
      stock: '',
      image: ''
    }
  },
  methods:{
    submitProduct(){
      let formData = new FormData();
      formData.append('image',this.image)
      formData.append('name',this.productName)
      formData.append('detail',this.desc)
      formData.append('price',this.price)
      formData.append('stock',this.stock)
      this.$q.loading.show()
      this.$store.dispatch('products/addProduct',formData)
        .then(()=>{
          this.$q.loading.hide()
          this.productName = ''
          this.desc = ''
          this.price = ''
          this.stock = ''
          this.image = ''
          this.$store.dispatch('products/getProduct')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Product submitted!'
          })
        })
        .catch((err)=>{
          this.$q.loading.hide()
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'report',
            message: `${err.join('-')}`
          })
        })
    },
    factoryFn(file){
      this.image = file[0]
    }
  },
  created(){
    this.$emit('bukanhome')
  }
}
</script>

<style>
#addPage{
  width: 80% !important;
  margin: 0 auto 100px auto !important;
  overflow:unset !important;
}
#titleAdd{
}
</style>