<template>
  <q-card class="my-card">
    <div id="main"  @click="detailCard">
      <div id="img">
        <img :src="product.image" width="100%" height="100%">
      </div>
      <div id="desc">
        <!-- belum handle kl namanya panjang -->
        <p>{{ product.name }}</p> 
        <p>{{ harga }}</p>
      </div>
    </div>
    <q-separator />
    <div id="cardFooter">
      <q-card-actions align="around">
        <q-btn flat round color="grey" icon="favorite" />
        <q-btn flat round color="teal" icon="add_shopping_cart" />
      </q-card-actions>
    </div>
    </q-card>
</template>

<script>
export default {
  props: ['product'],
  computed : {
    harga(){
      return 'Rp. ' + this.product.price
    }
  },
  methods : {
    detailCard(){
      let productId = this.product._id
      this.$router.push({path: `/product/${productId}`})
      this.$store.dispatch('products/findProduct',this.product._id)
      console.log('masuk')
    }
  }

}
</script>

<style>
.my-card{
  width: 18% !important;
  margin-left: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
#img{
  height: 110px;
  padding: 3px
}
#desc{
  font-weight: 500;
  word-wrap:break-word;
  margin: 4px 5px
}
p{
  margin-bottom: 0px !important
}
</style>