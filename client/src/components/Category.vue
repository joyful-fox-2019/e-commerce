<template>
    <div class="container my-4">
        <div style="display:flex;">
            <div @click="filterProduct('vegetable')" style="width: 20%; margin: 0 10px; padding: 5px 0; border: 1px solid #ececec; cursor:pointer;">
                <div style="display:flex; justify-content:center;">
                    <div class="mt-1">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/category-icon-new%2F1530182713018_Vegetables-min.png?alt=media&token=e12445f7-57fb-45ec-bf5a-87993ddec8a5" alt="category" style="width:50px;">
                    </div>
                    <div class="ml-2 mt-3">
                        <p style="color:black;">Vegetables</p>
                    </div>
                </div>
            </div>
            <div @click="filterProduct('fruit')" style="width: 20%; margin: 0 10px; padding: 5px 0; border: 1px solid #ececec; cursor:pointer;">
                <div style="display:flex; justify-content:center;">
                    <div class="mt-1">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/category-icon-new%2F1530181378402_SAYURICON-buah-min.png?alt=media&token=9551f990-8bd8-4791-87cc-1f8b7f61a3cf" alt="category" style="width:50px;">
                    </div>
                    <div class="ml-2 mt-3">
                        <p style="color:black;">Fruits</p>
                    </div>
                </div>
            </div>
            <div @click="filterProduct('protein')" style="width: 20%; margin: 0 10px; padding: 5px 0; border: 1px solid #ececec; cursor:pointer;">
                <div style="display:flex; justify-content:center;">
                    <div class="mt-1">
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-2059615900628317391.appspot.com/o/category-icon-new%2F1560915523722_sayurbox%20icon%20package%20OPS-04.png?alt=media" alt="category" style="width:50px;">
                    </div>
                    <div class="ml-2 mt-3">
                        <p style="color:black;">Proteins</p>
                    </div>
                </div>
            </div>
            <div @click="filterProduct('grain')" style="width: 20%; margin: 0 10px; padding: 5px 0; border: 1px solid #ececec; cursor:pointer;">
                <div style="display:flex; justify-content:center;">
                    <div class="mt-1">
                        <img src="https://storage.googleapis.com/dev-sayurbox.appspot.com/sku-lg/1572497347275_scale_500x500_85_color_not_blur_oxl.jpg" alt="category" style="width:50px;">
                    </div>
                    <div class="ml-2 mt-3">
                        <p style="color:black;">Grains</p>
                    </div>
                </div>
            </div>
            <div @click="filterProduct('all')" style="width: 20%; margin: 0 10px; padding: 5px 0; border: 1px solid #ececec; cursor:pointer;">
                <div style="display:flex; justify-content:center;">
                    <div class="mt-1">
                        <img src="https://www.sayurbox.com/assets/images/menu-category-min.png" alt="category" style="width:50px;">
                    </div>
                    <div class="ml-2 mt-3">
                        <p style="color:black;"> Semua Kategori </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  name: 'Category',
  methods: {
    filterProduct (payload) {
      let temp = {}
      if (payload === 'vegetable') {
        temp.isVegetable = true
        temp.isFruit = false
        temp.isProtein = false
        temp.isGrain = false
      } else if (payload === 'fruit') {
        temp.isVegetable = false
        temp.isFruit = true
        temp.isProtein = false
        temp.isGrain = false
      } else if (payload === 'protein') {
        temp.isVegetable = false
        temp.isFruit = false
        temp.isProtein = true
        temp.isGrain = false
      } else if (payload === 'grain') {
        temp.isVegetable = false
        temp.isFruit = false
        temp.isProtein = false
        temp.isGrain = true
      } else {
        temp.isVegetable = true
        temp.isFruit = true
        temp.isProtein = true
        temp.isGrain = true
      }
      this.$store.commit('filterProduct', temp)
    }
  }
}
</script>

<style>

</style>
