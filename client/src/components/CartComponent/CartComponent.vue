<template>
  <div>
    <div class="card mdl-card--vertical d-flex mt-3 rowCart">
      <div class="mdl-card__media imgCart ml-2">
        <img :src="getCart.product_image" alt="img" style='width: 6vw'>
      </div>
      <div class="textCart ml-4">
        <div class="text-head">
          Store: &nbsp;{{ getCart.storeName }}
        </div>
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{ getCart.name }}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          {{ getCart.description }}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">Total: {{ getCart.count }} | price: @ Rp.{{ getCart.price }} | Cost: {{ totalPrice }}</a>
        </div>
        <div class="mdl-card__menu menuBtn">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple" @click='removeCart(getCart.name)'><v-icon name='minus' class='vicon'></v-icon>
            <i>Remove</i>
          </button>

          <div>
            <button class="btn-sm btn-outline-success ml-2" @click='changeCheck' v-if='!check'>Check Price</button>
            <button class="btn-sm btn-outline-warning ml-2" @click='changeCheck' v-if='check'>Uncheck</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/server.js';

export default {
  data () {
    return {
      check: false
    }
  },
  methods: {
    removeCart (name) {
      this.$store.dispatch('removeCart', name)
      this.$awn.success('removed!')
      this.$router.push({ name: 'cart' })
      this.getCart = data.cart
    },
    changeCheck () {  
      this.check = !this.check
      this.$emit('change', this.check, this.totalPrice)
    }
  },
  props: ['getCart'],
  computed: {
    totalPrice () {
      return Number(this.getCart.count)*Number(this.getCart.price)
    }
  }
}
</script>

<style>
.menuBtn {
  display: flex;
  flex-direction: row;
}
.imgCart {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rowCart {
  display: flex;
  flex-direction: row;
}
</style>