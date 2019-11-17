<template>
    <div class="container">
    <b-jumbotron class="mt-5">
    <template v-slot:header>Sell Product</template>
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
                        placeholder="Name" aria-describedby="helpId">
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
                        placeholder="Price" aria-describedby="helpId">
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
                        placeholder="description" aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                </div>
                <div class="col-md-4 mb-3">
                        <label for="last_name">Choose Your Image</label>
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
                        placeholder="pcs.." aria-describedby="helpId">
                </div>
                <div class="col-md-4 mb-3">
                </div>
            </div>
            <div class="text-center">
                <button @click.prevent="addProduct" class="btn btn-primary" type="submit" >Create Product</button>
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
import Swal from 'sweetalert2'
export default {
  name: 'register',
  data () {
      return {
          name: '',
          price: '',
          description: '',
          image: '',
          image1: '',
          quantities: ''
      }
  },
  methods: {
      imageInput(){
          this.image = event.target.files[0]
      },
      imageInput1(){
          this.image1 = event.target.files[0]
      },
      addProduct(){
          let formData = new FormData()
          formData.append("name",this.name)
          formData.append("price",this.price)
          formData.append("description",this.description)
          formData.append("quantities",this.quantities)
          formData.append("imgUrl",this.image)
          formData.append("imgUrl",this.image1)
          Swal.showLoading()
          this.$store.dispatch('createProduct',formData)
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
                  title: 'Create Product in successfully'
                })
                this.$router.go(-1)
            })
            .catch(err=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Create Product is Failed!"
                });
            })
      }
  }
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
