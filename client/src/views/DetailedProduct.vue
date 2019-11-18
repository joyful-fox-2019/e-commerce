<template>
<div>
  <!-- <div v-if="productDetailed && productDetailed.name">{{productDetailed}}</div>
  <div v-else>loading...</div> -->
  <!-- add to cart button tambahin ntr validasi ada/gak stock nya kl gak gbs di click -->
  <!-- kasi toast added to your cart, biar user bs browse belanjaan lain lg -->

  <div class="pageProduct">
    <div class="productImage">
      <img :src="productDetailed.imageSource">
    </div>
    <div class="productInfo">
      <h1>{{productDetailed.name}}</h1>
      <p class="infoText">
        {{productDetailed.description}}
      </p>
      <p class="price">
        <!-- {{productDetailed.price}} -->
        {{formatPrice}}
      </p>
      <p class="stock">
        {{productDetailed.stock}}
      </p>
    </div>

  </div>

  <!-- increment -->
  <div v-if="!isAdmin" class="numberContainer">
    <b-field>
        <b-numberinput type="is-dark" size="is-small" v-model="number" controls-position="compact"
            controls-rounded>
        </b-numberinput>
    </b-field>

  </div>
  <!-- increment  -->

  <button v-if="!isAdmin" @click="addedToCart">add to cart</button>
  <div v-if="isAdmin" >
    <div><button @click="$router.push('/products/update')">update</button></div>
    <div><button @click="remove">delete</button></div>
  </div>
</div>
</template>

<script>
// import { toast } from 'bulma-toast'

export default {
  name: 'detailedProduct',
  data () {
    return {
      productDetailed: {
        price: 0
      },
      number: 0
    }
  },
  methods: {
    fetchDetailedProduct () {
      const id = this.$route.params.id
      this.axios(`/products/${id}`)
        .then(({ data }) => {
          // console.log(data)
          this.productDetailed = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addedToCart () {
      console.log(this.$route)
      if (!localStorage.getItem('token')) {
        this.$buefy.toast.open({
          type: 'is-white',
          message: 'You have to login'
        })
      } else {
        this.$buefy.toast.open({
          type: 'is-white',
          message: 'Added to your cart'
        })
        this.axios.post('/carts', {
          product: this.$route.params.id,
          amount: this.number
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    remove () {
      // console.log("delete donggg")
      const id = this.productDetailed._id
      this.axios.delete(`/products/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data, 'data deleted')
          // this.$emit('remove')
          this.$router.push('/collections')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    formatPrice () {
      return `IDR ${this.productDetailed.price.toLocaleString()}`
    },
    isAdmin () {
      console.log(localStorage.getItem('isAdmin'))
      return localStorage.getItem('isAdmin')
    }
  },
  created () {
    this.fetchDetailedProduct()
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

// $dustyPink: #B29578;
$primary: red;

.numberContainer {
  width: 100px;
  margin: auto;
  color: $primary;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // width: 20px !important;

}

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
