<template>
  <v-hover>
    <v-card slot-scope="{ hover }" class=" p3" color="grey lighten-4" width="250" height="100%">
      <!--<v-img :src="product.image">-->
      <v-img :src="product.image" height="200">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out black darken-3 v-card--reveal display-0 white--text "
            style="height: 100%;">
            {{getPrice}}
          </div>
        </v-expand-transition>
      </v-img>

      <v-card-text class="pt-4" style="position: relative;">
        <v-btn absolute color="black" class="white--text" fab medium right top v-if="isLogin">
          <v-icon
            @click.stop="addToCart"
            v-if="isLogin && loginUser.role === 'customer'">
            fa-shopping-cart
          </v-icon>
          <v-icon
             @click.stop="showEdit=true"
            v-if="isLogin && loginUser.role === 'admin'">
            fa-edit
          </v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">
        </div>
        <h3 class="display-0 font-weight-light black--text mb-2">{{product.name}}</h3>
        <h3 class="display-0 font-weight-light black--text mb-2" v-if="isLogin && loginUser.role === 'admin'"><span>Stok: </span>{{product.stock}}</h3>
        <v-btn @click.stop="deleteProduct" small  v-if="isLogin && loginUser.role === 'admin'">Delete</v-btn>
        <!--<ProductDialog v-model="showEdit" :edit="true" :product="product" />-->
      </v-card-text>
    </v-card>

  </v-hover>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .9;
  position: absolute;
  width: 100%;
}
</style>
<script>
import { mapState } from 'vuex'
import rupiahConverter from '@/helper/rupiahConverter'
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      showEdit: false
      // edit:true
    }
  },
  components: {
  },
  methods: {
    addToCart () {
      let cartItem = this.cart.find(obj => obj.product._id === this.product._id)
      if (cartItem) {
        this.$store.commit('SHOW_SNACKBAR', { text: 'this item already exists in your cart' })
      } else {
        let data = {
          product: this.product._id
        }
        instance({
          method: 'POST',
          url: `/carts`,
          data
        })
          .then(response => {
            if (response.status === 201) {
              this.$store.commit('SHOW_SNACKBAR', { text: 'Successfully added to cart' })
              this.$store.dispatch('getUserCart')
            }
          })
          .catch(error => {
            axiosErrorHandler(error)
          })
      }
    },
    deleteProduct () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            return instance({
              method: 'delete',
              url: `/products/${this.product._id}`,
              headers: {
                'Authorization': localStorage.getItem('token')
              }
            })
          } else {
            throw new Error('delete canceled')
          }
        })
        .then(result => {
          this.$store.commit('SHOW_SNACKBAR', { text: 'Successfully deleted data' })
          this.$store.dispatch('getAllProducts')
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
        .catch(function (error) {
          axiosErrorHandler(error)
        })
    }
  },
  computed: {
    ...mapState(['isLogin', 'loginUser', 'cart']),
    getPrice () {
      return rupiahConverter(this.product.price)
    }
  },
  props: ['product', 'hover']
}
</script>
