<template>
  <div id="userWishlist">
    <q-card flat bordered class="my-cardssssss" style="width: 60%; margin: 30px auto">
          <q-card-section>
            <div class="text-h6">Oops..</div>
          </q-card-section>

          <q-card-section>
            This feature is still under construction, please come again later
          </q-card-section>
        </q-card>
      <!-- <card v-for="product in wishlistProducts" :key="product.i" :product="product"></card> -->
      <!-- {{wishlistProducts}} -->
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'

export default {
  name: 'wishlist',
  computed: {
    ...mapState('users',[
      'user',
      'wishlist'
    ]),
    wishlistProducts(){
      let temp = []
      if(this.user.wishlist){
        if(this.user.wishlist.length > 1){
          this.user.wishlist.forEach(element => {
            temp.push(element)
          });
        }
        return temp
      }
    }
  },
  created(){
    this.$emit('bukanhome',false)
  }
}
</script>

<style>
#userWishlist{
  width: 80%;
  margin: 20px auto
}
</style>