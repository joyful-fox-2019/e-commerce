<template>
  <div>
    <div class="card mdl-card--vertical d-flex mt-3 rowCart">
      <div class="mdl-card__media imgCart ml-2">
        <img :src="getProduct.product_image" alt="img" style='width: 6vw'>
      </div>
      <div class="textCart ml-4">
        <div class="text-head">
          <b>{{ getProduct.name }}</b>
        </div>
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{  }}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          {{ getProduct.description }}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=",MaterialButton,MaterialRipple">price: @ Rp.{{ getProduct.price }}</a>
        </div>
        <div class="mdl-card__menu menuBtn">
          
          <b-badge pill :variant="i%2==0 ? 'success' : 'info' " class='badgec32 ml-2' v-for='(category, i) in getProduct.category' :key='i'> {{ category }} </b-badge>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getProduct']
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