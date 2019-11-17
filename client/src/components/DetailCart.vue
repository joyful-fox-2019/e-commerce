<template>
  <div class="columns is-mobile">
    <div class="column">
      <img :src="cart.product.imageSource">
    </div>
      <div class="column">
        <div>{{cart.product.name}}</div>
        <div>{{price}}</div>
      </div>
      <div class="column">
        <!-- {{ cart.amount }} -->
         <!-- increment  -->
          <div class="container">
            <div @click="updateDown"><i class="fas fa-minus"></i></div>
            <div>{{cart.amount}}</div>
            <div @click="updateUp"><i class="fas fa-plus"></i></div>
          </div>
          <!-- increment  -->
      </div>
      <div @click="remove" class="column"><span style="cursor: pointer;">delete</span></div>
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
    remove () {
      // console.log("delete donggg")
      const id = this.cart._id
      this.axios.delete(`/carts/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data, 'data deleted')
          this.$emit('remove')
        })
        .catch(err => {
          console.log(err)
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
