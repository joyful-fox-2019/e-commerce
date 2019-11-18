<template>
    <v-container fluid xs12>
      <v-layout  align-center justify-space-between row xs12 id="layout" >
        <v-img :src="cartitem.product.image" height="100" max-width="150"/>
        <h4>{{cartitem.product.name}}</h4>
        <h4>
            <span><v-btn class="smallbtn" fab small round @click="minus"><v-icon>fa-minus</v-icon></v-btn></span>
            {{itemCount}}x
            <span> <v-btn class="smallbtn" fab small round @click="add"><v-icon>fa-plus</v-icon></v-btn></span>
        </h4>
        <div>
          <h4>{{subtotal}}<span><v-btn fab small round @click="remove" class="smallbtn" color="error"> <v-icon >fa-trash</v-icon></v-btn></span></h4>
        </div>
      </v-layout>
    </v-container>
</template>
<style lang="css" scoped>
    #layout{
        background-color: gray;
        padding: 10px
    }
    .smallbtn{
        width:30px !important;
        height:30px !important;
    }
</style>
<script>

import rupiahConverter from '../helper/rupiahConverter'
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'
export default {
  created () {
    this.itemCount = this.cartitem.count
    this.itemId = this.cartitem._id
  },
  data () {
    return {
      itemCount: 0,
      itemId: ''
    }
  },
  props: ['cartitem', 'index'],
  computed: {
    subtotal () {
      return rupiahConverter(this.itemCount * this.cartitem.product.price)
    }
  },
  methods: {
    add () {
      if (this.itemCount < this.cartitem.product.stock) {
        this.itemCount++
        this.$store.commit('setCartCount', {
          index: this.index,
          count: this.itemCount
        })
      }
    },
    minus () {
      if (this.itemCount > 0) {
        this.itemCount--
        this.$store.commit('setCartCount', {
          index: this.index,
          count: this.itemCount
        })
      }
    },
    remove () {
      instance({
        method: 'delete',
        url: `/carts/${this.itemId}`,
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getCart')
        })
        .catch(error => {
          axiosErrorHandler(error)
        })
    }
  }
}
</script>
