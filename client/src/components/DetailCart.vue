<template>
  <div class="columns">
    <div class="column">
      <img :src="cart.product.imageSource">
    </div>
      <div class="column">
        <div>{{cart.product.name}}</div>
        <!-- {{cart.product}} -->
        <div>{{price}}</div>
      </div>
      <div class="column">
        <!-- {{ cart.amount }} -->
         <!-- increment  -->
          <div class="container">
            <b-button type="is-text"  @click="updateDown" :disabled="cart.amount === 1"><i class="fas fa-minus"></i></b-button>
            <div>{{cart.amount}}</div>
            <b-button type="is-text" @click="updateUp" :disabled="cart.amount >= cart.product.stock"><i class="fas fa-plus"></i></b-button>
          </div>
          <!-- increment  -->
      </div>
      <button class="button is-light" @click="confirmDelete" ><span style="cursor: pointer;">delete</span></button>
      <div class="column">{{ totalPrice }}</div>
  </div>
</template>

<script>
export default {
  props: ['cart'],
  data () {
    return {
      // number: 0
    }
  },
  methods: {
    updateUp () {
      this.cart.amount++

      const id = this.cart._id
      const { amount } = this.cart

      if (amount <= this.cart.product.stock) {
        this.axios.patch(`/carts/${id}`, {
          amount
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data, 'dr detil cart, yg mo di updateee nambahhhh')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    updateDown () {
      this.cart.amount--

      const id = this.cart._id
      const { amount } = this.cart
      this.axios.patch(`/carts/${id}`, {
        amount
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'dr detil cart, yg mo di updateee kurangggg')
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmDelete () {
      this.$buefy.dialog.confirm({
        title: 'Deleting cart',
        message:
          'Are you sure you want to <b>delete</b> this cart? This action cannot be undone.',
        confirmText: 'Delete Cart',
        type: 'is-dark',
        size: 'is-small',
        canCancel: 'button',
        hasIcon: true,
        onConfirm: () => {
          const id = this.productDetailed._id
          this.axios
            .delete(`/products/${id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({ data }) => {
              // console.log(data, 'data deleted')
              // this.$emit('remove')
              this.$buefy.toast.open('Account deleted!')
              this.$router.push('/collections')
            })
            .catch(err => {
              console.log(err)
              this.$emit('alert', err)
            })
        }
      })
    }
  },
  computed: {
    totalPrice () {
      const total = this.cart.product.price * this.cart.amount
      return `IDR ${total.toLocaleString()}`
    },
    price () {
      return `IDR ${this.cart.product.price.toLocaleString()}`
    }
    // amount () {
    //   this.number = this.cart.amount
    //   return this.number
    // }
  },
  watch: {
    number () {
      console.log('aaaaaaaaa')
    }
  }
}

</script>

<style scoped>
img {
  width: 160px;
  height: 160px;
}
columns {
  width: 90px !important;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 90px !important;
}

</style>
