<template>
  <div>
    <v-carousel
      v-model="model"
      :show-arrows="showArrows"
      :hide-delimiters="hideDelimiters"
      :cycle="cycle"
    >
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              <v-img
              :src="products[i].image"
              width="100%"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              >
              </v-img>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        'primary',
        'red',
        'primary',
        'red',
        'primary'
      ],
      model: 0,
      showArrows: true,
      hideDelimiters: false,
      cycle: true
    }
  },
  props: {
    products: Array
  }
}
</script>

<style>

</style>
