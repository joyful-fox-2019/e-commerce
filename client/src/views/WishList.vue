<template>
  <div id='wish'>
    <div class='imageEmpty' v-if='user.WishList.length == 0'>
      <h2 class='textEmpty'>let's make a wish list, it can definitely come true</h2>
      <div>
        <img src="http://i415.photobucket.com/albums/pp236/Keefers_/Keffers%20Animals/evilmonkey.jpg" />
      </div>
    </div>
    <div class='productC' v-else>
      <div v-for='(product, i) in user.WishList' :key='i'>
        <ProductComponent :get-product='product'></ProductComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ProductComponent from '@/components/ProductComponent/ProductComponent.vue'

export default {
  components: {
    ProductComponent
  },
  computed: {
    user () {
      return this.$store.state.userSignin
    }
  }
}
</script>

<style scoped>
.productC {
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.imageEmpty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

#wish img {
    /* filter: url(filters.svg#grayscale); Firefox 3.5+ */
      filter: gray; /* IE5+ */
      -webkit-filter: grayscale(1); /* Webkit Nightlies & Chrome Canary */
      -webkit-transition: all .8s ease-in-out;  
    }

    #wish img:hover {
    filter: none;
      -webkit-filter: grayscale(0);
      -webkit-transform: scale(1.01);
    }
</style>