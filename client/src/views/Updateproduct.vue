<template>
  <div>
    <q-page class="row justify-center items-center" >
    <q-card square class="shadow-24" style="width:700px; height:600px;">
      <q-card-section class="bg-blue-grey-5">
        <img alt="Quasar logo" src="../assets/logo.png" style="width:100px; height:80px;">
        <div class="text-h4 absolute-right" style="margin-top:40px; margin-right:10px;">Update Product</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pt-xl">
          <q-input square clearable 
            v-model="name" 
            type="name" 
            label="Name">
              <template v-slot:prepend>
                <q-icon name="insert_photo" />
              </template>
          </q-input>
          <q-input square clearable 
            v-model="price" 
            type="number" 
            label="Price" 
            lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your price',
                val => val > 10000 || 'Minimal amount is 10000'
              ]">
            <template v-slot:prepend>
              <q-icon name="monetization_on" />
            </template>
          </q-input>
          <q-input square clearable 
            v-model="stock" 
            type="number" 
            label="Stock" 
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your stock',
              val => val > 0 || 'Minimal amount is 1'
            ]">
            <template v-slot:prepend>
              <q-icon name="input" />
            </template>
          </q-input>
          <q-input
            @input="val => { file = val[0] }"
            type="file"
            hint="File Image"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-lg">
        <q-btn @click.prevent="updateproduct" unelevated size="lg" color="blue-grey-14" class="full-width text-white" label="Update Product" />
      </q-card-actions>
    </q-card>
  </q-page>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: 'Updateproduct',
  props: ['id', 'data'],
  data(){
    return{
      name: this.data.name,
      price: this.data.price,
      stock: this.data.stock,
      file: this.data.img,
      idProduct: this.data._id
    }
  },
  methods: {
    updateproduct(){
      console.log(this.idProduct, 'updateee')
      const formData = new FormData()
        formData.append('img', this.file)
        formData.set('name', this.name)
        formData.set('price', this.price)
        formData.set('stock', this.stock)
        // formData.set('idProduct', this.idProduct)
        let payload = {data: formData, idProduct: this.idProduct}
        Swal.showLoading()
      this.$store.dispatch('updateProducts', payload)
        .then(data => {
          Swal.fire({
            title: 'Success',
            text: `Success Update Product`,
            icon: 'success'
          }),
          this.$store.dispatch('product')
          this.$router.push('/')
        })
        .catch(err => {
          this.next(err)
        })
    }
  }
}
</script>

<style>

</style>