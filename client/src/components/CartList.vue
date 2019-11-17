<template>
  <div>
    <div class="row">
      <div class="col">
        <figure class="image is-96x96" style="max-height: 50px !important;">
          <img :src="cart.idProduct.imgUrl" />
        </figure>
      </div>
      <div class="col detail">
        <h6 class="title is-6">{{cart.idProduct.name}}</h6>
        <p>Qty : {{qty}}</p>
        <p>Price : {{price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</p>
        <div class="number-input">
          <b-field>
            <b-numberinput min="1" v-model="qty" type="is-light"></b-numberinput>
          </b-field>
        </div>
      </div>
      <div class="col">
        <button
          style="margin-left: 80px;margin-top: 25px;"
          @click="deleteCart(cart._id)"
          class="button is-danger is-small btn"
        >Delete</button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CartList',
  props: ['cart'],
  data () {
    return {
      isFullPage: true,
      qty: this.cart.qty,
      firstQty: this.cart.qty
    }
  },
  methods: {
    deleteCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          const loadingComponent = this.$buefy.loading.open({
            container: this.isFullPage ? null : this.$refs.element.$el
          })
          if (result.value) {
            this.$store.dispatch('deleteCart', id).then(() => {
              setTimeout(() => loadingComponent.close(), 1 * 1000)
              Swal.fire('Deleted!', 'Your Cat has been deleted.', 'success')
              this.$store.dispatch('getCart')
            })
          } else {
            loadingComponent.close()
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  computed: {
    price: {
      get () {
        return this.cart.idProduct.price
      }
    }
  },
  watch: {
    qty () {
      let payload = {
        qty: this.qty,
        id: this.cart._id
      }
      this.$store
        .dispatch('countTotal', payload)
        .then(_ => {
          if (this.$store.state.isAdmin === false) {
            this.$store.dispatch('getCart')
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
<style scoped>
.row {
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.col {
  width: 50vw;
  margin: 5px 10px;
  max-height: 110px;
}
.detail {
  flex-grow: 1;
  justify-content: left !important;
}
</style>
