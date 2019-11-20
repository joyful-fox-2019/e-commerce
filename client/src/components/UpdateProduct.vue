<template>
    <div class="container">
    <b-jumbotron class="mt-5">
    <template v-slot:header>Update Product</template>
    <template v-slot:lead>
        jualah yang harus dijual ok!
    </template>
    <hr class="my-4">
        <form>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Name Of Product</label>
                    <input v-model="name" type="text" class="form-control text-center" name="last_name" id="last_name"
                        :placeholder="dataUpdate.name" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">price</label>
                    <input v-model="price" type="number" class="form-control text-center" name="last_name" id="last_name"
                        :placeholder="dataUpdate.price" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Description Of Product</label>
                    <input v-model="description" type="text" class="form-control text-center" name="last_name" id="last_name"
                        :placeholder="dataUpdate.description" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                        <label for="last_name">Choose Your Image</label>
                        <p>Before Change</p>
                        <img :src="dataUpdate.imgUrl[0]" alt="gambar tidak ditemukan" class="mb-2" style="height:200px;">
                    <div class="custom-file">
                        <input v-on:change="imageInput" type="file" class="custom-file-input" id="validatedCustomFile" required>
                        <label  class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                        <label for="last_name">Choose Your Image</label>
                        <p>Before Change</p>
                        <img :src="dataUpdate.imgUrl[1]" alt="gambar tidak ditemukan" class="mb-2" style="height:200px;">
                    <div class="custom-file">
                        <input v-on:change="imageInput1" type="file" class="custom-file-input" id="validatedCustomFile" required>
                        <label  class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                    <label for="last_name">Quantities</label>
                    <input v-model="quantities" type="number" class="form-control text-center" name="last_name" id="last_name"
                        :placeholder="dataUpdate.quantities + '/pcs'" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="text-center">
                <button @click.prevent="update()" class="btn btn-primary" type="submit" >Update Product</button>
            </div>
        </form>
        <hr>
    <div class="text-center mt-2">
        <input class="btn btn-sm btn-success" type="submit" @click="$router.go(-1)" value="Back">
    </div>
  </b-jumbotron>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'register',
  data () {
      return {
          name: '',
          price: '',
          description: '',
          image:  '',
          image1: '',
          quantities: '',
      }
  },
  methods: {
      imageInput(){
          this.image = event.target.files[0]
      },
      imageInput1(){
          this.image1 = event.target.files[0]
      },
      update(){
          let formData = new FormData()
          this.name ? formData.append("name",this.name) : formData.append("name",this.dataUpdate.name)
          this.price ? formData.append("price",this.price) : formData.append("price",this.dataUpdate.price)
          this.description ? formData.append("description",this.description) : formData.append("description",this.dataUpdate.description)
          this.quantities ? formData.append("quantities",this.quantities) : formData.append("quantities",this.dataUpdate.quantities)
          this.image ? formData.append("imgUrl",this.image) : formData.append("imgUrl", this.dataUpdate.imgUrl[0])
          this.image1 ? formData.append("imgUrl",this.image1) : formData.append("imgUrl", this.dataUpdate.imgUrl[1])
          Swal.showLoading()
          this.$store.dispatch('updateMyProduct', { formData , id : this.dataUpdate._id})
            .then(user=>{
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  onOpen: (toast) => { 
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Update Product in successfully'
                })
                this.$router.go(-1)
            })
            .catch(err=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Update Product is Failed!"
                });
            })
      }
  },
  started  () {
      this.$store.state.dataUpdate
  },
  computed: mapState([ 'dataUpdate' ])
}
</script>

<style>
.btnHoverOne{
    transition: 0.5s;
}
.btnHoverOne:hover{
    color: blue;
}
</style>
