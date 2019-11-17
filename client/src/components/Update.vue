<template>
  <div id="addPages">
    <div>
      <h4>Fill out this form to update product</h4>
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
      :rules="[ val => val && val > 1000 || 'Please input product price']"
      :dense="true" />

        <div>
      ( to upload an image, select image first, then click cloud button)
        </div>
        <div id="setImage">
          <div id="img1">
            <img :src="prevImage" width="200px" />
          </div>
          <q-uploader
              id="img2"
              url=""
              label="Image"
              color="blue"
              :factory="factoryFn"
              square
              flat
              bordered
              style="max-width: 300px"
            />
        </div>
    
      <div>
        <q-btn label="Update" type="submit" color="primary" id="submitButton"/>
        <q-btn label="Remove product" color="red" @click="deleteProduct"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'updateProduct',
  props: ['prod'],
  data(){
    return{
      productName : this.prod.name,
      desc: this.prod.detail,
      price: this.prod.price,
      stock: this.prod.stock,
      prevImage: this.prod.image,
      image: '',
      id: this.prod._id
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
      let payload = {
        formData,
        _id : this.id
      }
      this.$store.dispatch('products/updateProduct',payload)
        .then(()=>{
          this.productName = ''
          this.desc = ''
          this.price = ''
          this.stock = ''
          this.image = ''
          this.$store.dispatch('products/getProduct')
          this.$emit('bukanupdate')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Product updated!'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    factoryFn(file){
      this.image = file[0]
    },
    deleteProduct(){
      let payload = { _id : this.id}
      this.$store.dispatch('products/removeProduct',payload)
        .then(()=>{
          this.productName = ''
          this.desc = ''
          this.price = ''
          this.stock = ''
          this.image = ''
          this.$store.dispatch('products/getProduct')
          this.$emit('bukanupdate')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Product deleted!'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created(){
  },
  watch : {
    prod(baru,lama){
      this.productName = baru.name
      this.desc = baru.detail
      this.price = baru.price
      this.stock = baru.stock
      this.prevImage = baru.image
      this.id = baru._id
    }
  }
}
</script>

<style>
#addPages{
  width: 80%;
  margin: 10px auto 10px auto;
  height: 95vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow-x: hidden
}
#titleAdd{
  margin: 20px !important
}
#setImage{
  display: flex;
  flex-direction: row
}
#img1{
  width: 200px;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.233);
  display: flex;
  align-items: center;
  margin-right: 30px
}
</style>