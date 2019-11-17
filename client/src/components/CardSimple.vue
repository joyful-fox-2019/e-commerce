<template>
  <div class="my-carsd" @click="thisCard(product)">
    <q-card >
      <q-img
        :src="product.image"
        basic
      >
        <div class="absolute-bottom text-p" id="simpleDesc">
          {{ product.name }}
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'simpleCard',
  props: ['product'],
  methods : {
    thisCard(val){
      this.$emit('card',val)
    }
  }
}
</script>

<style>
#simpleDesc{
  margin: 0px;
  padding: 0px
}
.my-carsd{
  margin-bottom: 10px;
  cursor: pointer;
}
</style>