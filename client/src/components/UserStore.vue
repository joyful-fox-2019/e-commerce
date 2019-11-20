<template>
<div class="container">
    <h2 class="text-center py-5">All Products in Your Store</h2>
  <div class="row">
      <div class="py-2 col-sm-3 px-1" v-for=" product in userProducts" :key="product._id">
          <!-- card template -->
          <div class="card">
              <img :src="product.image" class="card-img-top" alt="...">
              <div class="card-body p-1">
                  <p class="card-text mb-0">{{product.name}}</p>
                  <p class="card-text mb-0">{{product.qty}}</p>
                  <p class="card-text text-danger mb-0">{{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}}</p>
                  <div class="d-flex flex-row justify-content-between pt-1">
                      <b-button v-b-modal.edit-product><a class="btn text-white btn-success" @click.prevent="showEdit(product)"><i class="fa fa-pencil-square-o"></i></a></b-button>
                      <a class="btn text-white btn-danger" @click.prevent="deleteProduct(product._id)" ><i class="fa fa-trash-o"></i></a>
                  </div>
                <router-view></router-view>
              </div>
          </div>
      </div>
      
  </div>  
</div>    
</template>

<script>
import axios from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
components : {
},
created () {
    console.log('masuk card ke user product', this.$store.state.userProducts)
    
  },
  data() {
    return {
      qty : 0
    }
  },
  methods : {
      showEdit(product) {
        this.$store.commit('setDataEdit', product)
      },
      deleteProduct(id) {
        console.log('masuk delete product')
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this todo!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
            }).then((result) => {
            if (result.value) {
                axios.delete(`/products/${id}`, {
                  headers : {
                    token : localStorage.getItem('token')
                  }
                })
              .then(({data}) => {
                console.log(data)
                Swal.fire(
                'Deleted!',
                'Your todo has been deleted.',
                'success'
                )            
              })
              .catch(err => {
                console.log(err)
              })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                'Cancelled',
                'Your todo is safe :)',
                'error'
                )
            }
        })        
      }
  },
  computed : {
      userProducts() {
          return this.$store.state.userProducts
      }
  }
}
</script>

<style scoped>
.btn { cursor: pointer; }

.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.btn-secondary {
  padding: 0px !important;
  margin: 0px !important;
  border : none
}
</style>
