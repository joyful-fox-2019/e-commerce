<template>
  <div>
  <b-card
      :title="item.name"
      :img-src="item.imgUrl[0]"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 mr-2 cardHover"
    >
    <b-card-text>
        price : {{item.price}}/pcs
    </b-card-text>
    <b-card-text>
        stock : {{item.quantities}}pcs
    </b-card-text>
    <b-button v-b-modal="'my-modal'+item._id" variant="primary">Details</b-button>
    <button v-if="item.userId._id !== idUser" v-show="isLogin" class="btn ml-2" v-b-modal="'my-modal'+item._id+1">
        <i class="fas fa-cart-plus fa-2x btnNone"></i>
    </button>
    <button v-if="!isLogin" class="btn ml-2" @click="$router.push('/login'),$store.commit('SET_BACK')" >
        <i class="fas fa-cart-plus fa-2x btnNone"></i>
    </button>
  </b-card>

  <b-modal :title="'Details '+item.name" centered :id="'my-modal'+item._id" scrollable>
    <b-card bg-variant="info" no-footer text-variant="white" >
      <blockquote class="card-blockquote">
        <header>
          <small>Product Name <cite title="Source Title"></cite></small>
        </header>
        <p>{{ item.name }}</p>
      </blockquote>
    </b-card>
    <b-card class="mt-1" bg-variant="primary" text-variant="white">
      <blockquote class="card-blockquote">
        <header>
          <small>Description <cite title="Source Title"></cite></small>
        </header>
        <p>{{ item.description }}</p>
      </blockquote>
    </b-card>
    <div class="d-flex flex-row mt-2">
        <b-badge variant="dark" style="position:relative;">Owner</b-badge>
        <b-badge variant="success" style="margin-left:-3px;">{{ item.userId.name }}</b-badge>
        <b-badge variant="dark" class="ml-1" style="position:relative;">Stock</b-badge>
        <b-badge variant="danger" style="margin-left:-3px;">{{ item.quantities }} pcs</b-badge>
    </div>
        <b-badge variant="dark" style="position:relative;">CreatedAt</b-badge>
        <b-badge variant="info" style="margin-left:-3px;">{{ new Date(item.createdAt) }}</b-badge>
    <br>
    <b-badge variant="" class="mt-3">
        ---------------------------------------------- Reference ----------------------------------------------------
    </b-badge>
    <div v-for="image in item.imgUrl" :key="image">
        <center>
            <img :src="image" style="height:200px;" class="mt-2" alt="icon">
        </center>
    </div>
  </b-modal>

  <b-modal v-model="show" :title="'Add To Cart '+item.name" centered :id="'my-modal'+item._id+1" scrollable>
    <b-card bg-variant="info" no-footer text-variant="white" >
      <blockquote class="card-blockquote">
        <header>
          <small>Product Name <cite title="Source Title"></cite></small>
        </header>
        <p>{{ item.name }}</p>
      </blockquote>
    </b-card>
    <b-card class="mt-1" bg-variant="primary" text-variant="white">
      <blockquote class="card-blockquote">
        <header>
          <small>Price Product <cite title="Source Title"></cite></small>
        </header>
        <p>{{ item.price }}/pcs</p>
      </blockquote>
    </b-card>
    <b-card class="mt-1" bg-variant="success" text-variant="white">
      <blockquote class="card-blockquote">
        <header>
          <small>Quantities <cite title="Source Title"></cite></small>
        </header>
        <p>{{ item.quantities }} pcs</p>
      </blockquote>
    </b-card>
    <b-input-group class="mt-2" size="lg" prepend="Qty" append="/pcs">
        <b-form-input v-model="quantities" type="number"></b-form-input>
    </b-input-group>
    <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false, createCart(item._id, item.quantities)"
          >
            Add to cart
          </b-button>
        </div>
      </template>
  </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  props: [
    'item'
  ],
  data () {
    return {
        quantities: '',
        show: false,
        idUser: localStorage.getItem('userId')
    }
  },
  methods: {
    createCart(id, maxQty){
        if (this.quantities < 1) {
            Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Jumlah yang anda masukkan ditolak!"
                });
        } else if (this.quantities > maxQty){
            Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Jumlah yang anda masukkan terlalu banyak!"
                });
        } else {
        let form = {
            productId: id,
            quantities: this.quantities
        }
        this.$store.dispatch('AddCart', form)
            .then(({ data })=>{
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
                  title: 'Add in Cart successfully'
                })
            })
            .catch(err=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Add To Cart Failed!"
                });
            })
        }
    }
  },
  computed: mapState(["isLogin"])
}
</script>

<style>
/* what is nice 😇 */
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}
/* -- */
.btnNone{
    transition: 0.5s;
}
.btnNone:hover{
    color: orange
}
</style>
