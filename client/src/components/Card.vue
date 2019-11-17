<template>
  <q-card class="my-card">
    <div id="main"  @click="detailCard">
      <div id="img">
        <img :src="product.image" width="100%" height="100%">
      </div>
      <div id="desc">
        <p>{{ product.name }}</p> 
        <p>{{ harga }}</p>
      </div>
    </div>
    <q-separator />
    <div id="cardFooter">
      <q-card-actions align="around">
        <q-btn flat round :color="color" icon="favorite" @click="addToWishlist"/>
      </q-card-actions>
    </div>
    </q-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['product'],
  data(){
    return {
      color : 'grey'
    }
  },
  methods : {
    detailCard(){
      let productId = this.product._id
      this.$router.push({path: `/product/${productId}`})
      this.$store.dispatch('products/findProduct',this.product._id)
      console.log('masuk')
    },
    addToWishlist(){
      this.$store.dispatch('users/addToWishlist',this.product._id)
        .then(() => {
          this.color = 'red'
        })
        .catch((err) => {
          if (err.response.status === 409){
          this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: `You have wishlisted this product`
            })  
          } else {
            this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'warning',
                message: `You must login first`
              })
          }
        })
    },
    setColor(val){
      console.log(val)
      if(val){
        if (localStorage.getItem('token')){
          console.log('masuks')
          console.log(this.user);
          if(this.user.wishlist){
            let color = ''
            let flag = false
            this.user.wishlist.forEach(element => {
              if(element === this.product._id){
                 flag = true
              }
            })
            if (flag){
              this.color = 'red'
            } else {
              this.color ='grey'
            }
          }
        } else {
          this.color = 'grey'
        }
      } else {
        this.color = 'grey'
      }
    }
  },
  computed : {
    ...mapState('users',[
      'user',
      'wishlist'
    ]),
    harga(){
      return 'Rp. ' + this.product.price
    },
  },
  watch : {
    user(baru,lama){
      if(baru.wishlist){
        this.setColor(true)
      } else {
        this.setColor(false)
      }
    }
  },
  created(){
    this.setColor()
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